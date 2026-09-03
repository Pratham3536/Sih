import express from "express";
import {
  getSystemStatus,
  connectCustomMongo,
  seedDatabase
} from "../controllers/systemController.js";

const router = express.Router();

router.get("/status", getSystemStatus);
router.post("/connect-mongo", connectCustomMongo);
router.post("/seed", seedDatabase);

export default router;
