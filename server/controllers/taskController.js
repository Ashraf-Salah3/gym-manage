// 🆕 controllers/taskController.js
import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ memberId: req.member.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const addTask = async (req, res) => {
  try {
    const { text } = req.body;
    const task = new Task({ memberId: req.member.id, text });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error adding task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: id, memberId: req.member.id },
      { status: req.body.status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, memberId: req.member.id });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
