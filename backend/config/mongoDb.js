import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export const connectMongoDB = async (customUri = null) => {
  const uri = customUri || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nhaa_db";

  try {
    if (mongoose.connection.readyState === 1) {
      console.log("[MongoDB] Already connected to:", mongoose.connection.name);
      return { success: true, dbName: mongoose.connection.name, host: mongoose.connection.host };
    }

    console.log(`[MongoDB] Connecting to: ${uri.replace(/\/\/.*@/, "//<credentials>@")}...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`[MongoDB] Successfully connected to database: ${conn.connection.name} on ${conn.connection.host}`);
    return { success: true, dbName: conn.connection.name, host: conn.connection.host };
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const getMongoStatus = () => {
  const state = mongoose.connection.readyState;
  const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  return {
    state: states[state] || "unknown",
    readyState: state,
    isConnected: state === 1,
    dbName: mongoose.connection.name || "nhaa_db",
    host: mongoose.connection.host || "localhost"
  };
};
