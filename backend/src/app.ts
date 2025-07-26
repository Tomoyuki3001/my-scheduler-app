import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

console.log("Connected to DB:", mongoose.connection.name);

app.get("/api/ping", (_req, res) => {
  res.send("server is running");
});

app.use("/api/events", eventRoutes);

export default app;
