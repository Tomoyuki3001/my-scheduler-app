import express from "express";
import Event from "../models/Event";

const router = express.Router();

//Get event data
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

//Creat an event
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

//Update an event data
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "The event not found" });
    }
    res.json(updatedEvent);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//Delete an event data
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvet = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvet) {
      return res.status(404).json({ error: "The event not found" });
    }
    res.json({ message: "The event deleted successfully!" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
