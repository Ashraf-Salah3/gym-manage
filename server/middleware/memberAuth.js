import jwt from "jsonwebtoken";
import Member from "../models/Member.js";

const memberAuth = async (req, res, next) => {
  const token = req.cookies.memberToken;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const member = await Member.findById(decoded.id).select("-password");

    if (!member) return res.status(404).json({ message: "Member not found" });

    req.member = member;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default memberAuth;
