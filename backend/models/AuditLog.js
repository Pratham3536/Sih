import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    userId: String,
    userEmail: String,
    userRole: String,
    caseId: String,
    details: mongoose.Schema.Types.Mixed,
    ipAddress: String
  },
  {
    timestamps: true
  }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
