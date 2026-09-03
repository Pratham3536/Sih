import express from "express";
import { loginUser, getRolesDirectory, getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/login", loginUser);
router.get("/roles", getRolesDirectory);

// Protected Routes
router.get("/me", protect, getMe);

export default router;
