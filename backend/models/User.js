import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["viewer", "officer", "counsellor", "legalaid", "supervisor", "admin"],
      default: "viewer"
    },
    roleTitle: {
      type: String,
      required: true
    },
    department: {
      type: String,
      default: "National Helpline Against Atrocities (14566)"
    },
    badge: {
      type: String,
      default: "MoSJE Certified"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model("User", userSchema);
