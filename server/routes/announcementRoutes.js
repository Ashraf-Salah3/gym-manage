import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
} from "../controllers/announcementController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin
router.post("/", authMiddleware, createAnnouncement);
router.get("/", authMiddleware, getAnnouncements);
router.delete("/:id", authMiddleware, deleteAnnouncement);

// Member
router.get("/member", getAnnouncements);

export default router;
