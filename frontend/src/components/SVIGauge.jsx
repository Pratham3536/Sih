import React from "react";

export const SVIGauge = ({ score = 82, riskLevel = "High", size = 180 }) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = "#3b82f6"; // default blue
  if (score >= 85) strokeColor = "#dc2626"; // red critical
  else if (score >= 65) strokeColor = "#ea580c"; // orange high
  else if (score >= 40) strokeColor = "#d97706"; // amber moderate
  else strokeColor = "#16a34a"; // green low

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Score Display */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900">
            {score}
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
            / 100 SVI
          </span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
          Vulnerability Rating
        </span>
        <span
          className="text-lg font-bold uppercase tracking-wide inline-block mt-0.5"
          style={{ color: strokeColor }}
        >
          {riskLevel} RISK
        </span>
      </div>
    </div>
  );
};
