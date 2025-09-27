import Announcement from "../models/Announcement.js";

// 🆕 Admin creates announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { message } = req.body;
    const announcement = await Announcement.create({
      message,
      date: new Date(),
    });
    res.status(201).json(announcement);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating announcement", error: err.message });
  }
};

// 🆕 Get announcements (both admin & member)
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({}, { __v: false });
    res.json(announcements);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching announcements", error: err.message });
  }
};

// 🆕 Delete announcement (admin only)
export const deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting announcement", error: err.message });
  }
};
