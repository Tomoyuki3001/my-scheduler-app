import express from "express";
import { EventController } from "../controllers/event.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/", EventController.getEvent);
router.post("/", authenticate, EventController.createEvent);
router.put("/:id", authenticate, EventController.updateEvent);
router.delete("/:id", authenticate, EventController.deleteEvent);

export default router;
