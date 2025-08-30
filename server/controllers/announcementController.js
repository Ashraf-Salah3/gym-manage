import Announcement from "../models/Announcement.js";

// 🆕 Admin creates announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { message } = req.body;
    const announcement = await Announcement.create({
      message,
      date: new Date(),
      gym: req.admin.gymName
    });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ message: "Error creating announcement", error: err.message });
  }
};

// 🆕 Get announcements (both admin & member)
export const getAnnouncements = async (req, res) => {
  try {
    const gymName = req.admin?.gymName || req.member?.gymName;
    const announcements = await Announcement.find({ gym: gymName }).sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Error fetching announcements", error: err.message });
  }
};

// 🆕 Delete announcement (admin only)
export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting announcement", error: err.message });
  }
};
