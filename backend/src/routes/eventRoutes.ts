import express from "express";
import { EventController } from "../controllers/EventController";

const router = express.Router();

router.get("/", EventController.getEvent);
router.post("/", EventController.createEvent);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

export default router;
