// routes/memberAuthRoutes.js
import express from "express";

const router = express.Router();

router.post("/logout", (req, res) => {
  res.clearCookie("memberToken", { httpOnly: true, sameSite: "strict" });
  res.json({ message: "Member logged out successfully" });
});

export default router;
