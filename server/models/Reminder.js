// 🆕 models/Reminder.js
import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  message: { type: String, required: true },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
});

export default mongoose.model("Reminder", reminderSchema);
