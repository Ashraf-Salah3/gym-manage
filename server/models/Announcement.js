import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  gym: { type: String, required: true }
});

export default mongoose.model("Announcement", announcementSchema);
