import express from "express";
import { EventController } from "../controllers/event.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", EventController.getEvent);
router.get("/:id", EventController.getEventDetails);

router.use(authenticate);

router.post("/", EventController.createEvent);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

export default router;
