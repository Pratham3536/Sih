import express from "express";
import authRoutes from "./authRoutes.js";
import caseRoutes from "./caseRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import systemRoutes from "./systemRoutes.js";

const router = express.Router();

// Mount MVC API Routers
router.use("/auth", authRoutes);
router.use("/cases", caseRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/system", systemRoutes);

// Root Gateway Health Endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    architecture: "MVC Express + Mongoose + MongoDB",
    project: "SIH26093 - Multilingual Real-Time Stress & Trauma Assessment System",
    helpline: "National Helpline Against Atrocities (14566)",
    ministry: "Ministry of Social Justice and Empowerment (MoSJE)",
    timestamp: new Date().toISOString()
  });
});

export default router;
