import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.MYSQL_DATABASE || "nhaa_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const mysqlPool = pool.promise();

export const testMySQLConnection = async () => {
  try {
    const [rows] = await mysqlPool.query("SELECT 1 + 1 AS solution");
    return { success: true, message: "MySQL Connected successfully", solution: rows[0].solution };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
