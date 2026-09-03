import React from "react";
import { ArrowLeft, Clock, UserCheck, Shield, FileText, CheckCircle2, AlertTriangle, Scale, HeartHandshake } from "lucide-react";
import { RiskBadge } from "../components/RiskBadge";
import { SVIGauge } from "../components/SVIGauge";
import { DisclaimerBanner } from "../components/DisclaimerBanner";

export const CaseDetails = ({ caseData, onBack }) => {
  if (!caseData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Case details unavailable.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DisclaimerBanner compact />

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Case Database</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-slate-900">Case Record Overview</h1>
            <span className="font-mono font-bold text-xs bg-blue-100 text-blue-900 px-2.5 py-1 rounded-md border border-blue-200">
              {caseData.id}
            </span>
            <RiskBadge riskLevel={caseData.riskLevel} />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Victim ID: <strong>{caseData.victimId}</strong> • Date: <strong>{caseData.date} ({caseData.timestamp})</strong>
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500 block">Current Status</span>
          <span className="text-sm font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 inline-block mt-0.5">
            {caseData.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVI Gauge & Key Specs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col items-center justify-center text-center space-y-4">
          <SVIGauge score={caseData.sviScore} riskLevel={caseData.riskLevel} size={180} />
          
          <div className="w-full space-y-2 text-xs border-t border-slate-100 pt-3">
            <div className="flex justify-between text-slate-600">
              <span>Language:</span>
              <span className="font-bold text-slate-900">{caseData.language}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Input Stream:</span>
              <span className="font-bold text-slate-900">{caseData.inputType}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Helpline Channel:</span>
              <span className="font-bold text-slate-900">NHAA 14566</span>
            </div>
          </div>
        </div>

        {/* Narrative & Indicators */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
              Interaction Transcript Narrative
            </h3>
            <p className="text-xs text-slate-800 leading-relaxed p-3.5 bg-slate-50 border border-slate-200 rounded-lg italic">
              "{caseData.transcript}"
            </p>
            {caseData.transcriptEnglish && caseData.language !== "English" && (
              <p className="text-xs text-slate-600 leading-relaxed p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                <strong>English Translation:</strong> "{caseData.transcriptEnglish}"
              </p>
            )}
          </div>

          {/* Counsellor Review Record */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" />
                Human Counsellor Review & Audit
              </h3>
              <span className="text-xs font-mono text-slate-500">{caseData.review?.reviewDate || "Pending"}</span>
            </div>
            {caseData.review?.validatedBy ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Reviewed By:</span>
                  <span className="font-bold text-slate-900">{caseData.review.validatedBy}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Validated Risk Level:</span>
                  <span className="font-bold text-blue-800">{caseData.review.overriddenRisk || caseData.riskLevel}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 text-slate-600">
                  <strong>Counsellor Review Notes:</strong>
                  <p className="mt-1 p-2.5 bg-slate-50 rounded border border-slate-200 italic">
                    "{caseData.review.notes || "No additional notes provided."}"
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">This case is currently pending formal counsellor review.</p>
            )}
          </div>
        </div>
      </div>

      {/* Audit Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Immutable Case Audit Timeline
        </h3>

        <div className="space-y-3 pl-2 border-l-2 border-blue-200">
          {caseData.timeline?.map((item, idx) => (
            <div key={idx} className="relative pl-5 text-xs">
              <div className="absolute -left-[9px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
              <span className="font-mono font-bold text-slate-500 mr-2">{item.time}</span>
              <span className="text-slate-800 font-medium">{item.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
