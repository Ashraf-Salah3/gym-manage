// server/routes/adminRoutes.js
import express from "express";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post("/logout", (req, res) => {
  res.clearCookie("adminToken").json({ message: "Logged out" });
});

export default router;
