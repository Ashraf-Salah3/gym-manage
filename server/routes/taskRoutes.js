// 🆕 routes/taskRoutes.js
import express from "express";
import { getTasks, addTask, updateTask, deleteTask } from "../controllers/taskController.js";
import memberAuth from "../middleware/memberAuth.js";

const router = express.Router();

router.get("/", memberAuth, getTasks);
router.post("/", memberAuth, addTask);
router.put("/:id", memberAuth, updateTask);
router.delete("/:id", memberAuth, deleteTask);

export default router;
