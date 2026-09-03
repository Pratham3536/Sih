import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sih2026_nhaa_trauma_secret_key_88492";

export const generateToken = (payload, expiresIn = "24h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
