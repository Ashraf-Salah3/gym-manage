// 🆕 routes/reminderRoutes.js
import express from "express";
import { sendReminder, getReminders } from "../controllers/reminderController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ for admin
import memberAuth from "../middleware/memberAuth.js"; // ✅ for member
import { deleteMyReminder } from "../controllers/reminderController.js";

const router = express.Router();

// Admin can send
router.post("/", authMiddleware, sendReminder);

// Member can view
router.get("/", memberAuth, getReminders);

// Member deletes their own reminder
router.delete("/my/:id", memberAuth, deleteMyReminder);

export default router;
