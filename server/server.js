// server/server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // <-- Import paymentRoutes
import taskRoutes from "./routes/taskRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import memberAuthRoutes from "./routes/memberAuthRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// config
dotenv.config();
const app = express();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("👉 __dirname is:", __dirname);
console.log("👉 Static path is:", path.join(__dirname, "../client/dist"));

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/admin", adminRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/payments", paymentRoutes); // <-- Add this line
app.use("/api/tasks", taskRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/members/auth", memberAuthRoutes);
app.use("/api/announcements", announcementRoutes);


app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// start server
const PORT = process.env.PORT ;
app.listen(PORT, () => 
  console.log(`🚀 Server running on port ${PORT}\nLink: http://localhost:${PORT}`)
);
