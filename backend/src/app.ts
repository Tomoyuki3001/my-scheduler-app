import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoute";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/ping", (_req, res) => {
  res.send("server is running");
});

app.use("/api/event", eventRoutes);
app.use("/api/user", userRoutes);

export default app;
