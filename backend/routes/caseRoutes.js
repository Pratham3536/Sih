import express from "express";
import {
  getAllCases,
  getCaseById,
  createCase,
  updateCaseReview,
  deleteCase
} from "../controllers/caseController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all cases & POST new assessment
router.route("/")
  .get(getAllCases)
  .post(createCase);

// Single case routes
router.route("/:id")
  .get(getCaseById)
  .delete(protect, authorize("admin"), deleteCase);

// Counsellor validation & override
router.patch("/:id/review", updateCaseReview);

export default router;
