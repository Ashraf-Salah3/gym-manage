import express from "express";
import jwt from "jsonwebtoken";
import Member from "../models/Member.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createMember, getMembers, updateMember, deleteMember } from "../controllers/memberController.js";

const router = express.Router();

// Only members for the logged-in admin's gym
router.get("/", authMiddleware, async (req, res) => {
  try {
    const members = await Member.find({ gymName: req.admin.gymName });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create member for the logged-in admin's gym
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, membershipType, expiryDate, password } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }
    const newMember = new Member({
      name,
      email,
      phone,
      membershipType,
      expiryDate,
      gymName: req.admin.gymName,
      password: password || phone // Default password to phone if not provided
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update and delete should also be protected
router.put("/:id", authMiddleware, updateMember);
router.delete("/:id", authMiddleware, deleteMember);

// Member login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await member.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res
      .cookie("memberToken", token, { httpOnly: true, sameSite: "Lax", secure: false })
      .json({ message: "Login successful", member: { email: member.email, gymName: member.gymName } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
