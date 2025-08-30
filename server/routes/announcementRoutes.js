import express from "express";
import { createAnnouncement, getAnnouncements, deleteAnnouncement } from "../controllers/announcementController.js";
import authMiddleware from "../middleware/authMiddleware.js";   // ✅ Admin auth
import memberAuth from "../middleware/memberAuth.js";           // ✅ Member auth

const router = express.Router();

// Admin
router.post("/", authMiddleware, createAnnouncement);
router.get("/", authMiddleware, getAnnouncements);
router.delete("/:id", authMiddleware, deleteAnnouncement);

// Member
router.get("/member", memberAuth, getAnnouncements);

export default router;
