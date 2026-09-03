import React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { DISCLAIMER_TEXT } from "../services/sviService";

export const DisclaimerBanner = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-2.5 flex items-center gap-2 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0" />
        <span className="font-medium">{DISCLAIMER_TEXT}</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-800/80 rounded-lg border border-blue-700 shrink-0">
          <ShieldCheck className="w-6 h-6 text-blue-300" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-100 flex items-center gap-2">
            Human-in-the-Loop AI Decision Support System
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-blue-700/60 rounded text-blue-200 border border-blue-600">
              SIH 2026 Prototype
            </span>
          </h4>
          <p className="text-xs text-blue-200 mt-0.5 max-w-3xl leading-relaxed">
            {DISCLAIMER_TEXT}
          </p>
        </div>
      </div>
      <div className="shrink-0 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800 text-[11px] font-mono text-blue-300">
        MoSJE • NHAA (14566)
      </div>
    </div>
  );
};
