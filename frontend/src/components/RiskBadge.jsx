import React from "react";

export const RiskBadge = ({ riskLevel }) => {
  let badgeStyle = "bg-slate-100 text-slate-700 border-slate-300";
  let dotStyle = "bg-slate-500";

  switch (riskLevel) {
    case "Critical":
      badgeStyle = "bg-red-50 text-red-700 border-red-200 font-semibold";
      dotStyle = "bg-red-600 animate-ping";
      break;
    case "High":
      badgeStyle = "bg-orange-50 text-orange-700 border-orange-200 font-semibold";
      dotStyle = "bg-orange-500";
      break;
    case "Moderate":
      badgeStyle = "bg-amber-50 text-amber-700 border-amber-200 font-medium";
      dotStyle = "bg-amber-500";
      break;
    case "Low":
      badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium";
      dotStyle = "bg-emerald-500";
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${badgeStyle}`}>
      <span className="relative flex h-2 w-2">
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotStyle}`}></span>
      </span>
      {riskLevel ? riskLevel.toUpperCase() : "UNKNOWN"}
    </span>
  );
};
