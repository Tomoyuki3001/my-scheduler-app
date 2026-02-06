import express from "express";
import { getSignature } from "../controllers/upload.controller";

const router = express.Router();

router.get("/get-signature", getSignature);

export default router;

