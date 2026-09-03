import React, { useState } from "react";
import { UserCheck, ShieldAlert, CheckCircle, Edit3, Save, RotateCcw } from "lucide-react";
import { RiskBadge } from "./RiskBadge";

export const ReviewPanel = ({ currentCase, onSaveReview }) => {
  const [overrideRisk, setOverrideRisk] = useState(currentCase?.review?.overriddenRisk || currentCase?.riskLevel || "High");
  const [isOverriding, setIsOverriding] = useState(false);
  const [notes, setNotes] = useState(currentCase?.review?.notes || "");
  const [submitted, setSubmitted] = useState(false);

  const handleValidate = () => {
    onSaveReview({
      action: "validate",
      overriddenRisk: currentCase.riskLevel,
      notes: notes || "AI Assessment verified and validated by authorized counsellor."
    });
    setSubmitted(true);
  };

  const handleOverrideSave = () => {
    onSaveReview({
      action: "override",
      overriddenRisk: overrideRisk,
      notes: notes || `Risk tier overridden to ${overrideRisk} following human review.`
    });
    setIsOverriding(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-md">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Human-in-the-Loop Review & Audit</h3>
            <p className="text-xs text-slate-500">Authorized Counsellor Verification & Override Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Status:</span>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              currentCase.status === "Validated"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : currentCase.status === "Overridden"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            {currentCase.status}
          </span>
        </div>
      </div>

      {/* AI vs Human Review Compare Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            AI Automated Assessment
          </span>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-extrabold text-slate-900">{currentCase.sviScore}</span>
              <span className="text-xs text-slate-500 font-mono"> / 100 SVI</span>
            </div>
            <RiskBadge riskLevel={currentCase.riskLevel} />
          </div>
        </div>

        <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-lg">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
            Human Validated Risk Level
          </span>
          <div className="flex items-center justify-between">
            {isOverriding ? (
              <select
                value={overrideRisk}
                onChange={(e) => setOverrideRisk(e.target.value)}
                className="text-sm font-bold text-slate-900 border border-blue-400 rounded-md p-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Low">Low Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="High">High Risk</option>
                <option value="Critical">Critical Risk</option>
              </select>
            ) : (
              <span className="text-lg font-bold text-slate-900">
                {currentCase.review?.overriddenRisk || currentCase.riskLevel}
              </span>
            )}
            <RiskBadge riskLevel={isOverriding ? overrideRisk : (currentCase.review?.overriddenRisk || currentCase.riskLevel)} />
          </div>
        </div>
      </div>

      {/* Counsellor Review Notes Input */}
      <div className="space-y-2 mb-4">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Edit3 className="w-3.5 h-3.5 text-slate-500" />
          Counsellor Review Notes & Justification
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter clinical observations, victim interview context, or reasoning for risk validation/override..."
          rows={3}
          className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        {!isOverriding ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleValidate}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Validate Assessment
            </button>
            <button
              onClick={() => setIsOverriding(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              Override Risk Level
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleOverrideSave}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              Confirm Override Risk
            </button>
            <button
              onClick={() => setIsOverriding(false)}
              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Cancel
            </button>
          </div>
        )}

        {currentCase.review?.validatedBy && (
          <span className="text-[11px] text-slate-500 italic">
            Reviewed by <strong>{currentCase.review.validatedBy}</strong> on {currentCase.review.reviewDate}
          </span>
        )}
      </div>

      {submitted && (
        <div className="mt-3 p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Review saved successfully! Audit log entry recorded.
        </div>
      )}
    </div>
  );
};
