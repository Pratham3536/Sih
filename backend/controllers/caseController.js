import { Case } from "../models/Case.js";
import { AuditLog } from "../models/AuditLog.js";
import { getMongoStatus } from "../config/mongoDb.js";
import { INITIAL_DEMO_CASES } from "../utils/seedData.js";

/**
 * @desc   Get all cases with filtering, search & sorting
 * @route  GET /api/v1/cases
 * @access Public / Protected
 */
export const getAllCases = async (req, res, next) => {
  try {
    const mongoStatus = getMongoStatus();
    const { riskLevel, status, language, search } = req.query;

    if (mongoStatus.isConnected) {
      const query = {};
      if (riskLevel) query.riskLevel = riskLevel;
      if (status) query.status = status;
      if (language) query.language = language;
      if (search) {
        query.$or = [
          { id: { $regex: search, $options: "i" } },
          { transcript: { $regex: search, $options: "i" } },
          { transcriptEnglish: { $regex: search, $options: "i" } },
          { victimId: { $regex: search, $options: "i" } }
        ];
      }

      let cases = await Case.find(query).sort({ createdAt: -1 }).lean();

      // Auto-populate initial demo cases if collection is currently empty
      if (cases.length === 0 && Object.keys(query).length === 0) {
        await Case.insertMany(INITIAL_DEMO_CASES);
        cases = await Case.find().sort({ createdAt: -1 }).lean();
      }

      return res.json({
        success: true,
        count: cases.length,
        cases,
        source: "MongoDB Atlas / Local"
      });
    }

    // Fallback Memory Cache
    let filtered = [...INITIAL_DEMO_CASES];
    if (riskLevel) filtered = filtered.filter((c) => c.riskLevel === riskLevel);
    if (status) filtered = filtered.filter((c) => c.status === status);
    if (language) filtered = filtered.filter((c) => c.language === language);

    return res.json({
      success: true,
      count: filtered.length,
      cases: filtered,
      source: "Offline Memory Cache"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get single case by Case ID
 * @route  GET /api/v1/cases/:id
 * @access Public / Protected
 */
export const getCaseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mongoStatus = getMongoStatus();

    if (mongoStatus.isConnected) {
      const caseItem = await Case.findOne({ id }).lean();
      if (!caseItem) {
        return res.status(404).json({ success: false, message: `Case [${id}] not found in database.` });
      }
      return res.json({ success: true, case: caseItem, source: "MongoDB" });
    }

    const matched = INITIAL_DEMO_CASES.find((c) => c.id === id);
    if (!matched) {
      return res.status(404).json({ success: false, message: `Case [${id}] not found.` });
    }
    return res.json({ success: true, case: matched, source: "Offline Cache" });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Create new AI Assessment Case
 * @route  POST /api/v1/cases
 * @access Public / Protected
 */
export const createCase = async (req, res, next) => {
  try {
    const caseData = req.body;
    const mongoStatus = getMongoStatus();

    if (!caseData.transcript && !caseData.transcriptEnglish) {
      return res.status(400).json({ success: false, message: "Transcript text or audio transcription is required." });
    }

    if (!caseData.id) {
      const totalCount = mongoStatus.isConnected ? await Case.countDocuments() : 5;
      caseData.id = `NHAA-2026-${String(totalCount + 1).padStart(3, "0")}`;
    }

    if (!caseData.victimId) {
      caseData.victimId = `VIC-${Math.floor(10000 + Math.random() * 90000)} (Anonymized)`;
    }

    if (!caseData.date) caseData.date = new Date().toISOString().split("T")[0];
    if (!caseData.timestamp) {
      caseData.timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " IST";
    }

    if (mongoStatus.isConnected) {
      const created = await Case.create(caseData);

      // Audit Log
      AuditLog.create({
        action: "CASE_CREATED",
        caseId: created.id,
        userEmail: req.user?.email || "system@nhaa14566.gov.in",
        details: {
          sviScore: created.sviScore,
          riskLevel: created.riskLevel,
          inputType: created.inputType
        }
      }).catch(() => {});

      return res.status(201).json({
        success: true,
        message: "AI Assessment Case created and persisted to MongoDB.",
        case: created,
        source: "MongoDB Atlas"
      });
    }

    return res.status(201).json({
      success: true,
      message: "AI Assessment Case processed locally (Offline mode).",
      case: caseData,
      source: "Offline Simulation"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update Counsellor Review / Override Risk Assessment
 * @route  PATCH /api/v1/cases/:id/review
 * @access Protected / Public
 */
export const updateCaseReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { action, overriddenRisk, notes, userName } = req.body;
    const mongoStatus = getMongoStatus();

    if (mongoStatus.isConnected) {
      const targetCase = await Case.findOne({ id });
      if (!targetCase) {
        return res.status(404).json({ success: false, message: `Case [${id}] not found in MongoDB.` });
      }

      const isOverride = action === "override" && overriddenRisk && overriddenRisk !== targetCase.riskLevel;
      const reviewerName = userName || req.user?.name || "Dr. Ananya Sharma (Trauma Counsellor)";

      targetCase.status = isOverride ? "Overridden" : "Validated";
      if (isOverride) targetCase.riskLevel = overriddenRisk;

      targetCase.review = {
        validatedBy: reviewerName,
        reviewDate: new Date().toLocaleString(),
        overriddenRisk: isOverride ? overriddenRisk : targetCase.riskLevel,
        notes: notes || ""
      };

      targetCase.timeline.push({
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        event: isOverride
          ? `Risk level overridden to ${overriddenRisk} by ${reviewerName}`
          : `Assessment validated by ${reviewerName}`
      });

      await targetCase.save();

      // Audit Log
      AuditLog.create({
        action: isOverride ? "RISK_OVERRIDDEN" : "ASSESSMENT_VALIDATED",
        caseId: id,
        userEmail: req.user?.email || reviewerName,
        userRole: req.user?.role || "counsellor",
        details: { action, overriddenRisk, notes }
      }).catch(() => {});

      return res.json({
        success: true,
        message: `Case ${id} successfully ${isOverride ? "overridden" : "validated"}.`,
        case: targetCase,
        source: "MongoDB Atlas"
      });
    }

    return res.json({
      success: true,
      message: `Case ${id} updated locally in memory cache.`,
      source: "Offline Simulation"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Delete a Case record
 * @route  DELETE /api/v1/cases/:id
 * @access Protected (Admin only)
 */
export const deleteCase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mongoStatus = getMongoStatus();

    if (mongoStatus.isConnected) {
      const deleted = await Case.findOneAndDelete({ id });
      if (!deleted) return res.status(404).json({ success: false, message: "Case not found." });

      AuditLog.create({
        action: "CASE_DELETED",
        caseId: id,
        userEmail: req.user?.email
      }).catch(() => {});

      return res.json({ success: true, message: `Case ${id} permanently removed.` });
    }

    return res.json({ success: true, message: `Case ${id} deleted locally.` });
  } catch (error) {
    next(error);
  }
};
