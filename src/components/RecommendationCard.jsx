import React from "react";
import { ShieldAlert, HeartHandshake, Scale, AlertTriangle, CheckCircle2 } from "lucide-react";

export const RecommendationCard = ({ recommendations = [] }) => {
  const getIcon = (category) => {
    if (category?.includes("Safety") || category?.includes("Emergency")) return ShieldAlert;
    if (category?.includes("Legal")) return Scale;
    if (category?.includes("Mental") || category?.includes("Counselling")) return HeartHandshake;
    return CheckCircle2;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800">Recommended Support Pathways</h3>
          <p className="text-xs text-slate-500">Automated triage recommendations based on SVI vulnerability score</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
          Action Triage Engine
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((path) => {
          const Icon = getIcon(path.category || path.type);
          return (
            <div
              key={path.id || path.title}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-3"
            >
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-0.5">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-800">{path.title}</h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      path.badgeColor || "bg-orange-100 text-orange-800 border-orange-200"
                    }`}
                  >
                    {path.urgency || "High"} Urgency
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{path.description}</p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Category:</span>
                  <span>{path.category || path.type}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Decision-Support Notice:</strong> Recommendations are AI-assisted suggestions. Final action and referral pathways must be determined by an authorized counsellor or officer.
        </p>
      </div>
    </div>
  );
};
