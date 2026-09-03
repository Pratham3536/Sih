/**
 * Support Recommendation Engine
 * 
 * Maps SVI Risk Level & Indicator Patterns to Mapped Support Pathways:
 * - Low: General helpline guidance, routine follow-up scheduling, informational resource packet.
 * - Moderate: Tele-counselling session scheduling, legal guidance cell referral, follow-up within 48h.
 * - High: Priority counselling, State Legal Services Authority (SLSA) notice, district nodal officer alert, safety plan assessment.
 * - Critical: Immediate physical safety team dispatch, District Magistrate / SP escalation, emergency shelter & medical intervention, 24/7 active helpline monitoring.
 * 
 * DISCLAIMER:
 * Recommendations are AI-assisted suggestions. Final action must be determined by an authorized counsellor/officer.
 */

export const getRecommendations = (riskLevel, indicators = {}) => {
  const disclaimer = "Recommendations are AI-assisted suggestions. Final action must be determined by an authorized counsellor/officer.";

  switch (riskLevel) {
    case "Critical":
      return {
        disclaimer,
        pathways: [
          {
            id: "path-c1",
            title: "Immediate Physical Safety Assessment & Protection",
            category: "Emergency & Safety",
            description: "Dispatch local NHAA mobile protection unit and alert District Superintendent of Police (SP) under PoA Act emergency provisions.",
            urgency: "Critical",
            badgeColor: "bg-red-100 text-red-800 border-red-300"
          },
          {
            id: "path-c2",
            title: "District Magistrate / Nodal Officer Escalation",
            category: "Governance & Enforcement",
            description: "Instant high-priority notification to District Magistrate (DM) / Nodal Atrocity Welfare Officer for immediate intervention.",
            urgency: "Critical",
            badgeColor: "bg-red-100 text-red-800 border-red-300"
          },
          {
            id: "path-c3",
            title: "Emergency Trauma & Psychological First Aid",
            category: "Mental Health",
            description: "Connect complainant directly to senior clinical psychologist / trauma specialist for immediate stabilization.",
            urgency: "High",
            badgeColor: "bg-orange-100 text-orange-800 border-orange-300"
          },
          {
            id: "path-c4",
            title: "Free Legal Aid & Protection Order Filing",
            category: "Legal Support",
            description: "Assign dedicated advocate from District Legal Services Authority (DLSA) for immediate injunction and relief filing.",
            urgency: "High",
            badgeColor: "bg-orange-100 text-orange-800 border-orange-300"
          }
        ]
      };

    case "High":
      return {
        disclaimer,
        pathways: [
          {
            id: "path-h1",
            title: "Trauma Counselling & Support Session",
            category: "Mental Health",
            description: "Schedule tele-counselling session within 12 hours with certified NHAA trauma specialist.",
            urgency: "High",
            badgeColor: "bg-orange-100 text-orange-800 border-orange-300"
          },
          {
            id: "path-h2",
            title: "Legal Aid & PoA Act Advisory",
            category: "Legal Support",
            description: "Connect complainant with State Legal Services Authority (SLSA) for advice on FIR registration and compensation rights.",
            urgency: "High",
            badgeColor: "bg-orange-100 text-orange-800 border-orange-300"
          },
          {
            id: "path-h3",
            title: "Local Police Station Nodal Unit Notification",
            category: "Safety Assessment",
            description: "Send priority vulnerability alert to local police station welfare desk for protective monitoring.",
            urgency: "Medium",
            badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
          }
        ]
      };

    case "Moderate":
      return {
        disclaimer,
        pathways: [
          {
            id: "path-m1",
            title: "Tele-Counselling & Stress Reduction Guidance",
            category: "Mental Health",
            description: "Schedule follow-up session within 48 hours for emotional support and coping strategy guidance.",
            urgency: "Medium",
            badgeColor: "bg-amber-100 text-amber-800 border-amber-300"
          },
          {
            id: "path-m2",
            title: "Welfare Scheme & Rights Information Cell",
            category: "Legal & Welfare",
            description: "Provide information package on applicable government relief and rehabilitation schemes.",
            urgency: "Low",
            badgeColor: "bg-slate-100 text-slate-800 border-slate-300"
          }
        ]
      };

    case "Low":
    default:
      return {
        disclaimer,
        pathways: [
          {
            id: "path-l1",
            title: "Helpline Guidance & Routine Support",
            category: "General Support",
            description: "Provide standard 14566 helpline contact details and offer optional wellness check-in.",
            urgency: "Low",
            badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
          }
        ]
      };
  }
};
