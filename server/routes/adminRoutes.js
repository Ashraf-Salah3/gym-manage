// server/routes/adminRoutes.js
import express from "express";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// @route   POST /api/admin/register
// @desc    Register a new admin + gym
router.post("/register", async (req, res) => {
  try {
    const { email, password, gymName, gymAddress, phone } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ email, password, gymName, gymAddress, phone });
    await newAdmin.save();

    // generate JWT token
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // set cookie
    res
      .cookie("adminToken", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // change to true in production
      })
      .status(201)
      .json({
        message: "Admin registered successfully",
        admin: {
          email: newAdmin.email,
          gymName: newAdmin.gymName,
        },
      });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/admin/login
// @desc    Login an existing admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res
      .cookie("adminToken", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // use true in production
      })
      .json({
        message: "Login successful",
        admin: {
          email: admin.email,
          gymName: admin.gymName,
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("adminToken").json({ message: "Logged out" });
});



export default router;
