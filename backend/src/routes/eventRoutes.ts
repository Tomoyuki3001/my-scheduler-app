import express from "express";
import Event from "../models/Event";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, start, end, userId } = req.body;
    const newEvent = await Event.create({
      title,
      description,
      start,
      end,
      userId,
    });
    res.status(200).json(newEvent);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
