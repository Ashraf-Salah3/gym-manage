// 🆕 controllers/reminderController.js
import Reminder from "../models/Reminder.js";

// Admin sends reminder
export const sendReminder = async (req, res) => {
  try {
    const { memberId, amount, dueDate } = req.body;

    const reminder = new Reminder({
      memberId,
      message: `Hi, your gym membership payment of E${amount} is due on ${new Date(
        dueDate
      ).toLocaleDateString()}. Please clear it to avoid interruption. Ignore if paid.`,
      dueDate,
    });

    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: "Error sending reminder" });
  }
};

// Member fetches reminders
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ memberId: req.member.id }).sort({
      createdAt: -1,
    });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reminders" });
  }
};

export const deleteMyReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      _id: id,
      memberId: req.member.id,
    });
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    await reminder.deleteOne();
    return res.json({ message: "Reminder deleted" });
  } catch (err) {
    console.error("deleteMyReminder error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
