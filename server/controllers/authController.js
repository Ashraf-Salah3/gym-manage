import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashed });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie("adminToken", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // Set to true in production (https)
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Authenticated", adminId: decoded.id });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const logoutAdmin = (req, res) => {
  res.clearCookie("adminToken");
  res.status(200).json({ message: "Logged out" });
};
