import { connectMongoDB, getMongoStatus } from "../config/mongoDb.js";
import { testMySQLConnection } from "../config/mysqlDb.js";
import { User } from "../models/User.js";
import { Case } from "../models/Case.js";
import { AuditLog } from "../models/AuditLog.js";
import { autoSeedDatabase } from "../utils/seedData.js";

/**
 * @desc   Get Full Database & System Health Check
 * @route  GET /api/v1/system/status
 * @access Public
 */
export const getSystemStatus = async (req, res, next) => {
  try {
    const mongoStatus = getMongoStatus();
    let userCount = 0;
    let caseCount = 0;
    let auditCount = 0;

    if (mongoStatus.isConnected) {
      try {
        userCount = await User.countDocuments();
        caseCount = await Case.countDocuments();
        auditCount = await AuditLog.countDocuments();
      } catch (err) {
        console.warn("[System Controller] Count warning:", err.message);
      }
    }

    const mysqlStatus = await testMySQLConnection();

    return res.json({
      success: true,
      service: "NHAA 14566 AI Assessment Backend Gateway",
      architecture: "MVC (Model-View-Controller) Node.js Express REST API",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      databases: {
        mongodb: {
          ...mongoStatus,
          collections: {
            users: userCount,
            cases: caseCount,
            auditLogs: auditCount
          }
        },
        mysql: mysqlStatus
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Connect to a custom MongoDB Atlas / Local URI
 * @route  POST /api/v1/system/connect-mongo
 * @access Public / Admin
 */
export const connectCustomMongo = async (req, res, next) => {
  try {
    const { mongoUri } = req.body;

    if (!mongoUri) {
      return res.status(400).json({ success: false, message: "MongoDB connection URI string is required." });
    }

    console.log("[System Controller] Connecting to provided MongoDB URI...");
    const connResult = await connectMongoDB(mongoUri);

    if (connResult.success) {
      // Auto seed preset users and initial cases
      await autoSeedDatabase();

      const userCount = await User.countDocuments();
      const caseCount = await Case.countDocuments();

      return res.json({
        success: true,
        message: `Successfully connected to MongoDB Database: "${connResult.dbName}" on host ${connResult.host}`,
        dbName: connResult.dbName,
        host: connResult.host,
        stats: { users: userCount, cases: caseCount }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Failed to connect to MongoDB: ${connResult.error}`,
        error: connResult.error
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Seed / Reset initial database records
 * @route  POST /api/v1/system/seed
 * @access Admin
 */
export const seedDatabase = async (req, res, next) => {
  try {
    await autoSeedDatabase();
    return res.json({ success: true, message: "Database collections seeded with default roles and cases." });
  } catch (error) {
    next(error);
  }
};
