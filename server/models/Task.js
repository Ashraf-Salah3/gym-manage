// 🆕 models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  text: { type: String, required: true },
  status: { type: String, enum: ["Pending", "In Progress"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", taskSchema);
