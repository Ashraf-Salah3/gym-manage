import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) return res.status(404).json({ message: "Admin not found" });

  req.admin = { id: admin._id, gymName: admin.gymName }; // ✅ Store logged-in admin
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
