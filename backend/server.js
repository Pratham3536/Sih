import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/mongoDb.js";
import { autoSeedDatabase } from "./utils/seedData.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import apiRoutes from "./routes/index.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Environment Configuration
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config(); // fallback to root .env if present

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Mount MVC API Routes (supporting /api and versioned /api/v1)
app.use("/api", apiRoutes);
app.use("/api/v1", apiRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Bootstrap Server & Initialize Database
const bootstrap = async () => {
  console.log("==================================================================");
  console.log("🏛️  NHAA 14566 AI Assessment Backend Gateway (MVC Architecture)");
  console.log("==================================================================");

  // Initialize MongoDB Connection
  const mongoRes = await connectMongoDB();
  if (mongoRes.success) {
    await autoSeedDatabase();
  } else {
    console.log("ℹ️  Backend active with offline fallback enabled. Connect MongoDB via Settings or .env.");
  }

  app.listen(PORT, () => {
    console.log(`📡 Base API Gateway:    http://localhost:${PORT}/api`);
    console.log(`🔐 Authentication:     http://localhost:${PORT}/api/v1/auth/roles`);
    console.log(`📋 Assessment Cases:   http://localhost:${PORT}/api/v1/cases`);
    console.log(`📊 Macro Analytics:    http://localhost:${PORT}/api/v1/analytics/overview`);
    console.log(`🏥 System & DB Health: http://localhost:${PORT}/api/v1/system/status`);
    console.log("==================================================================");
  });
};

bootstrap();
