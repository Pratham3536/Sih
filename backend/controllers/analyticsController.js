import { Case } from "../models/Case.js";
import { getMongoStatus } from "../config/mongoDb.js";
import { INITIAL_DEMO_CASES } from "../utils/seedData.js";

/**
 * @desc   Get High-Level National Macro Analytics for Ministry Dashboard
 * @route  GET /api/v1/analytics/overview
 * @access Public / Protected
 */
export const getMacroAnalytics = async (req, res, next) => {
  try {
    const mongoStatus = getMongoStatus();
    let cases = [];

    if (mongoStatus.isConnected) {
      cases = await Case.find().lean();
      if (!cases || cases.length === 0) cases = INITIAL_DEMO_CASES;
    } else {
      cases = INITIAL_DEMO_CASES;
    }

    const total = cases.length;
    const critical = cases.filter((c) => c.riskLevel === "Critical").length;
    const high = cases.filter((c) => c.riskLevel === "High").length;
    const moderate = cases.filter((c) => c.riskLevel === "Moderate").length;
    const low = cases.filter((c) => c.riskLevel === "Low").length;

    const pending = cases.filter((c) => c.status === "Pending Review").length;
    const validated = cases.filter((c) => c.status === "Validated" || c.status === "Reviewed").length;
    const overridden = cases.filter((c) => c.status === "Overridden").length;

    const voiceCount = cases.filter((c) => c.inputType === "Voice").length;
    const textCount = cases.filter((c) => c.inputType === "Text").length;

    const avgSvi = total > 0 ? Math.round(cases.reduce((sum, c) => sum + (c.sviScore || 0), 0) / total) : 0;

    // Language Distribution
    const languages = cases.reduce((acc, c) => {
      const lang = c.language || "Hindi";
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalCases: total,
        averageSviScore: avgSvi,
        criticalCases: critical,
        highRiskCases: high,
        moderateCases: moderate,
        lowRiskCases: low,
        pendingReviewCount: pending,
        validatedCount: validated,
        overriddenCount: overridden,
        inputBreakdown: { voice: voiceCount, text: textCount },
        languageDistribution: languages
      },
      regionalHotspots: [
        { state: "Maharashtra", district: "Nagpur / Amravati", riskIndex: 88, activeAlerts: 14 },
        { state: "Uttar Pradesh", district: "Gorakhpur / Azamgarh", riskIndex: 82, activeAlerts: 19 },
        { state: "Madhya Pradesh", district: "Sagar / Jabalpur", riskIndex: 76, activeAlerts: 9 },
        { state: "Rajasthan", district: "Bharatpur / Alwar", riskIndex: 74, activeAlerts: 7 }
      ]
    });
  } catch (error) {
    next(error);
  }
};
