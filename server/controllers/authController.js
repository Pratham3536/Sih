import { User } from "../models/User.js";
import { PRESET_USERS } from "../utils/seedData.js";
import { generateToken } from "../utils/tokenHelper.js";
import { getMongoStatus } from "../config/mongoDb.js";
import { AuditLog } from "../models/AuditLog.js";

/**
 * @desc   Authenticate user & return JWT token + role permissions
 * @route  POST /api/v1/auth/login
 * @access Public
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, roleId } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Official Email Address is required." });
    }

    let userProfile = null;
    const mongoStatus = getMongoStatus();

    // 1. Check MongoDB if active
    if (mongoStatus.isConnected) {
      try {
        const dbUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (dbUser) {
          userProfile = {
            id: dbUser._id,
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role,
            roleTitle: dbUser.roleTitle,
            department: dbUser.department,
            badge: dbUser.badge,
            permissions: PRESET_USERS.find((p) => p.role === dbUser.role)?.permissions || []
          };
        }
      } catch (err) {
        console.warn("[Auth Controller DB]", err.message);
      }
    }

    // 2. Preset Fallback Lookup
    if (!userProfile) {
      const matchedPreset = PRESET_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() || (roleId && u.role === roleId)
      );

      if (matchedPreset) {
        userProfile = {
          email: matchedPreset.email,
          name: matchedPreset.name,
          role: matchedPreset.role,
          roleTitle: matchedPreset.roleTitle,
          department: matchedPreset.department,
          badge: matchedPreset.badge,
          permissions: matchedPreset.permissions
        };
      } else {
        const fallbackRole = PRESET_USERS.find((r) => r.role === roleId) || PRESET_USERS[0];
        userProfile = {
          email,
          name: email.split("@")[0].replace(".", " ").replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
          role: fallbackRole.role,
          roleTitle: fallbackRole.roleTitle,
          department: fallbackRole.department,
          badge: fallbackRole.badge,
          permissions: fallbackRole.permissions
        };
      }
    }

    // 3. Issue JWT Token
    const token = generateToken({
      email: userProfile.email,
      role: userProfile.role,
      name: userProfile.name
    });

    // 4. Log Audit Event if DB connected
    if (mongoStatus.isConnected) {
      AuditLog.create({
        action: "USER_LOGIN",
        userEmail: userProfile.email,
        userRole: userProfile.role,
        details: { department: userProfile.department }
      }).catch(() => {});
    }

    return res.json({
      success: true,
      message: `Signed in successfully as ${userProfile.name} (${userProfile.roleTitle})`,
      user: {
        ...userProfile,
        jwtToken: token
      },
      token,
      source: mongoStatus.isConnected ? "MongoDB Atlas" : "Offline Demo Simulation"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get All Available System Roles & Demo Credentials Directory
 * @route  GET /api/v1/auth/roles
 * @access Public
 */
export const getRolesDirectory = async (req, res, next) => {
  try {
    const roles = PRESET_USERS.map((u) => ({
      id: u.role,
      role: u.role,
      name: u.roleTitle.split("(")[0].trim(),
      title: u.roleTitle,
      officialName: u.name,
      email: u.email,
      demoPassword: u.password,
      department: u.department,
      badge: u.badge,
      permissions: u.permissions
    }));

    return res.json({
      success: true,
      count: roles.length,
      roles
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Verify current active session & token profile
 * @route  GET /api/v1/auth/me
 * @access Protected
 */
export const getMe = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};
