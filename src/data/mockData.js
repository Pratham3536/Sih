/**
 * Mock Data for SIH 2026 Project: Problem Statement SIH26093
 * AI-Based Real-Time Stress and Trauma Assessment Module
 * National Helpline Against Atrocities (14566) & Integrated Portal
 */

export const DEMO_CASE = {
  id: "NHAA-2026-001",
  victimId: "VIC-84920 (Anonymized)",
  date: "2026-09-01",
  timestamp: "10:21 AM IST",
  language: "Hindi",
  inputType: "Voice",
  audioFileName: "interaction_14566_nhaa_001.wav",
  audioDuration: "00:48",
  transcript: "वे मुझे और मेरे परिवार को लगातार धमकी दे रहे हैं। मैं बहुत डरी हुई हूँ और मुझे घर जाने में डर लग रहा है। मुझे नहीं पता कि मदद के लिए किससे संपर्क करूँ।",
  transcriptEnglish: "They are constantly threatening me and my family. I am very scared and afraid to go home. I don't know who to contact for help.",
  nlpResults: {
    fear: 0.82,
    threat: 0.88,
    isolation: 0.65,
    vulnerability: 0.84,
    emotionalDistress: 0.78,
    explanations: [
      "Explicit threat-related keywords detected in linguistic stream ('धमकी', 'threats')",
      "High fear & distress sentiment markers identified ('बहुत डरी हुई', 'scared')",
      "Help-seeking & isolation pattern matched ('नहीं पता किससे संपर्क करूँ', 'uncertainty')"
    ]
  },
  speechResults: {
    pitchVariationHz: 245,
    pitchElevated: true,
    mfccMean: -18.4,
    speechRateWpm: 185,
    pauseFrequency: "High (12 pauses > 1.2s)",
    tremorIndex: 0.74,
    explanations: [
      "Acoustic features indicate elevated fundamental pitch frequency (F0 variance)",
      "Irregular pause duration and speech rate jitter detected by Librosa extraction"
    ]
  },
  sviScore: 84,
  riskLevel: "High",
  status: "Pending Review",
  recommendations: [
    {
      id: "rec-1",
      title: "Immediate Safety Assessment",
      type: "Safety",
      description: "Dispatch local NHAA field liaison and contact nearest district nodal police unit for victim protection.",
      urgency: "High"
    },
    {
      id: "rec-2",
      title: "Trauma Counselling Support",
      type: "Counselling",
      description: "Schedule immediate tele-counselling session with a certified trauma specialist on Helpline 14566.",
      urgency: "High"
    },
    {
      id: "rec-3",
      title: "Legal Assistance & Free Aid",
      type: "Legal",
      description: "Connect complainant with State Legal Services Authority (SLSA) under PoA (Prevention of Atrocities) Act rules.",
      urgency: "Medium"
    }
  ],
  review: {
    validatedBy: null,
    reviewDate: null,
    overriddenRisk: null,
    notes: ""
  },
  timeline: [
    { time: "10:21 AM", event: "Interaction received via NHAA 14566 Voice Helpline" },
    { time: "10:22 AM", event: "Whisper ASR Speech-to-Text completed (Hindi detected)" },
    { time: "10:22 AM", event: "Hugging Face Transformer NLP + Librosa feature extraction complete" },
    { time: "10:23 AM", event: "Multimodal Fusion Engine generated SVI Score (84/100 - High Risk)" },
    { time: "10:23 AM", event: "Case routed to Counsellor Review Queue" }
  ]
};

export const INITIAL_CASES = [
  DEMO_CASE,
  {
    id: "NHAA-2026-002",
    victimId: "VIC-91024 (Anonymized)",
    date: "2026-09-01",
    timestamp: "09:45 AM IST",
    language: "Marathi",
    inputType: "Text",
    transcript: "आम्हाला गावातून बहिष्कृत करण्याची धमकी दिली जात आहे. पिण्याच्या पाण्याची विहीर बंद केली आहे.",
    transcriptEnglish: "We are being threatened with social boycott in the village. The drinking water well has been shut off.",
    sviScore: 91,
    riskLevel: "Critical",
    status: "Reviewed",
    review: {
      validatedBy: "Dr. A. Sharma (Senior Counsellor)",
      reviewDate: "2026-09-01 10:05 AM",
      overriddenRisk: "Critical",
      notes: "Confirmed severe atrocity threat (water access cutoff). Emergency police protection & district collector escalation initiated."
    },
    nlpResults: {
      fear: 0.89,
      threat: 0.94,
      isolation: 0.92,
      vulnerability: 0.88,
      emotionalDistress: 0.85,
      explanations: ["Social boycott indicators present", "Essential amenity restriction detected"]
    },
    speechResults: null,
    recommendations: [
      { id: "rec-c1", title: "Emergency Police Protection", type: "Safety", description: "Immediate physical security team deployment.", urgency: "Critical" },
      { id: "rec-c2", title: "District Magistrate Escalation", type: "Legal", description: "Urgent atrocity report filed with District Collector.", urgency: "Critical" }
    ],
    timeline: [
      { time: "09:45 AM", event: "Text grievance submitted via Integrated Portal" },
      { time: "09:46 AM", event: "SVI Score calculated (91/100 - Critical)" },
      { time: "10:05 AM", event: "Reviewed and Escalated by Senior Officer" }
    ]
  },
  {
    id: "NHAA-2026-003",
    victimId: "VIC-77341 (Anonymized)",
    date: "2026-08-31",
    timestamp: "04:15 PM IST",
    language: "English",
    inputType: "Voice",
    transcript: "I need guidance on filing a follow-up inquiry regarding my scholarship application delay under the scheme.",
    sviScore: 42,
    riskLevel: "Moderate",
    status: "Reviewed",
    review: {
      validatedBy: "P. R. Verma (Counsellor)",
      reviewDate: "2026-08-31 04:30 PM",
      overriddenRisk: "Moderate",
      notes: "Administrative grievance regarding welfare scheme processing. Routed to nodal department."
    },
    nlpResults: {
      fear: 0.35,
      threat: 0.15,
      isolation: 0.30,
      vulnerability: 0.45,
      emotionalDistress: 0.40,
      explanations: ["Administrative inquiry patterns detected", "Low threat indicators"]
    },
    speechResults: { pitchElevated: false, tremorIndex: 0.22 },
    recommendations: [
      { id: "rec-m1", title: "Welfare Officer Guidance", type: "Counselling", description: "Provide status update on application.", urgency: "Low" }
    ],
    timeline: [
      { time: "04:15 PM", event: "Voice call recorded" },
      { time: "04:30 PM", event: "Resolved by Counsellor" }
    ]
  },
  {
    id: "NHAA-2026-004",
    victimId: "VIC-65109 (Anonymized)",
    date: "2026-08-31",
    timestamp: "02:30 PM IST",
    language: "Hindi",
    inputType: "Text",
    transcript: "पंचायत चुनाव के बाद हमारे परिवार को बार-बार डराया जा रहा है और काम पर नहीं जाने दिया जा रहा।",
    transcriptEnglish: "After the panchayat elections, our family is repeatedly being intimidated and blocked from attending work.",
    sviScore: 79,
    riskLevel: "High",
    status: "Pending Review",
    nlpResults: {
      fear: 0.78,
      threat: 0.81,
      isolation: 0.72,
      vulnerability: 0.75,
      emotionalDistress: 0.74,
      explanations: ["Economic blockade & intimidation detected"]
    },
    speechResults: null,
    recommendations: [
      { id: "rec-h1", title: "Legal Protection & Employment Protection", type: "Legal", description: "Notify local Block Development Officer and Police station.", urgency: "High" }
    ],
    timeline: [
      { time: "02:30 PM", event: "Portal text interaction logged" }
    ]
  },
  {
    id: "NHAA-2026-005",
    victimId: "VIC-55201 (Anonymized)",
    date: "2026-08-30",
    timestamp: "11:10 AM IST",
    language: "English",
    inputType: "Voice",
    transcript: "My neighbor threatened to take away our land parcel. I am feeling very anxious about our safety at night.",
    sviScore: 68,
    riskLevel: "Moderate",
    status: "Reviewed",
    review: {
      validatedBy: "Dr. A. Sharma (Senior Counsellor)",
      reviewDate: "2026-08-30 11:35 AM",
      overriddenRisk: "Moderate",
      notes: "Land dispute complaint with anxiety indicators. Local revenue officer notified."
    },
    nlpResults: {
      fear: 0.68,
      threat: 0.65,
      isolation: 0.45,
      vulnerability: 0.62,
      emotionalDistress: 0.70,
      explanations: ["Property threat with psychological stress"]
    },
    speechResults: { pitchElevated: true, tremorIndex: 0.55 },
    recommendations: [
      { id: "rec-m2", title: "Revenue & Legal Mediation", type: "Legal", description: "Direct referral to Revenue Legal Cell.", urgency: "Medium" }
    ],
    timeline: [
      { time: "11:10 AM", event: "Call received" }
    ]
  }
];

export const MOCK_USER_ROLES = [
  { id: "counsellor", name: "Trauma Counsellor", title: "Authorized Psychological Counsellor (NHAA)" },
  { id: "officer", name: "Nodal Protection Officer", title: "District Nodal Officer (MoSJE)" },
  { id: "admin", name: "System Administrator", title: "Integrated Portal Administrator" }
];
