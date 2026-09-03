import React from "react";
import { AlertCircle, ShieldAlert, UserX, HeartPulse, HelpCircle } from "lucide-react";

export const IndicatorCard = ({ nlpResults = {} }) => {
  const {
    fear = 0.82,
    threat = 0.76,
    isolation = 0.64,
    vulnerability = 0.85,
    emotionalDistress = 0.71,
    explanations = []
  } = nlpResults;

  const indicators = [
    { label: "Threat Level", val: Math.round(threat * 100), icon: ShieldAlert, color: "bg-red-500", textCol: "text-red-700" },
    { label: "Fear State", val: Math.round(fear * 100), icon: AlertCircle, color: "bg-orange-500", textCol: "text-orange-700" },
    { label: "Vulnerability", val: Math.round(vulnerability * 100), icon: HelpCircle, color: "bg-amber-500", textCol: "text-amber-700" },
    { label: "Emotional Distress", val: Math.round(emotionalDistress * 100), icon: HeartPulse, color: "bg-purple-500", textCol: "text-purple-700" },
    { label: "Isolation Index", val: Math.round(isolation * 100), icon: UserX, color: "bg-blue-500", textCol: "text-blue-700" }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800">Contributing Vulnerability Indicators</h3>
          <p className="text-xs text-slate-500">Multi-label indicator extraction from NLP & Acoustic signals</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
          Hugging Face NLP Engine
        </span>
      </div>

      <div className="space-y-4">
        {indicators.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${ind.textCol}`} />
                  <span>{ind.label}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">{ind.val}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${ind.color} transition-all duration-700 rounded-full`}
                  style={{ width: `${ind.val}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {explanations && explanations.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-100 bg-slate-50/80 rounded-lg p-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Why this assessment? (AI Explainability Signals)
          </h4>
          <ul className="space-y-1.5">
            {explanations.map((exp, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
