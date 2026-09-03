import express from "express";
import { getMacroAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/overview", getMacroAnalytics);

export default router;
