import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoute";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

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
