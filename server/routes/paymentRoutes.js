import express from "express";
import { getPayments, makePayment, getReceipt, sendReminder } from "../controllers/paymentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Get all payments for logged-in admin's gym
router.get("/", authMiddleware, getPayments);

// 📌 Make a payment
router.post("/pay", authMiddleware, makePayment);

// 📌 View / Download receipt
router.get("/receipt/:id", authMiddleware, getReceipt);

// 📌 Send reminder (stores it in member's reminder field)
router.post("/remind/:id", authMiddleware, sendReminder);

export default router;
