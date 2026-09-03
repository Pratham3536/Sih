import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  type: { type: String, enum: ["Safety", "Counselling", "Legal", "Medical", "Administrative"], default: "Counselling" },
  description: String,
  urgency: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" }
}, { _id: false });

const timelineEventSchema = new mongoose.Schema({
  time: String,
  event: String
}, { _id: false });

const caseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    victimId: {
      type: String,
      default: "VIC-Anonymous"
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0]
    },
    timestamp: {
      type: String,
      default: () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " IST"
    },
    language: {
      type: String,
      default: "Hindi"
    },
    inputType: {
      type: String,
      enum: ["Voice", "Text"],
      default: "Voice"
    },
    audioFileName: String,
    audioDuration: String,
    transcript: {
      type: String,
      required: true
    },
    transcriptEnglish: String,
    sviScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Moderate", "High", "Critical"],
      required: true
    },
    status: {
      type: String,
      enum: ["Pending Review", "Reviewed", "Validated", "Overridden", "Escalated", "Closed"],
      default: "Pending Review"
    },
    nlpResults: {
      fear: { type: Number, default: 0 },
      threat: { type: Number, default: 0 },
      isolation: { type: Number, default: 0 },
      vulnerability: { type: Number, default: 0 },
      emotionalDistress: { type: Number, default: 0 },
      explanations: [String]
    },
    speechResults: {
      pitchVariationHz: Number,
      pitchElevated: Boolean,
      mfccMean: Number,
      speechRateWpm: Number,
      pauseFrequency: String,
      tremorIndex: Number,
      explanations: [String]
    },
    recommendations: [recommendationSchema],
    review: {
      validatedBy: { type: String, default: null },
      reviewDate: { type: String, default: null },
      overriddenRisk: { type: String, default: null },
      notes: { type: String, default: "" }
    },
    timeline: [timelineEventSchema]
  },
  {
    timestamps: true
  }
);

export const Case = mongoose.model("Case", caseSchema);
