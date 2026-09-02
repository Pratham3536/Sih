import React from "react";
import { BarChart3, PieChart, Languages, Mic, FileText, TrendingUp, ShieldAlert } from "lucide-react";
import { useCases } from "../context/CaseContext";

export const Analytics = () => {
  const { cases } = useCases();

  const total = cases.length;
  const criticalCount = cases.filter((c) => c.riskLevel === "Critical").length;
  const highCount = cases.filter((c) => c.riskLevel === "High").length;
  const modCount = cases.filter((c) => c.riskLevel === "Moderate").length;
  const lowCount = cases.filter((c) => c.riskLevel === "Low").length;

  const hindiCount = cases.filter((c) => c.language === "Hindi").length;
  const marathiCount = cases.filter((c) => c.language === "Marathi").length;
  const engCount = cases.filter((c) => c.language === "English").length;

  const voiceCount = cases.filter((c) => c.inputType === "Voice").length;
  const textCount = cases.filter((c) => c.inputType === "Text").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            System Analytics & Risk Insights
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time aggregate data visualization across NHAA 14566 & Integrated Portal intake channels.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
          Total Sample: {total} Cases
        </span>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Distribution Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Cases by Risk Tier
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">SVI Scale</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Critical */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-red-700">Critical Risk (85-100 SVI)</span>
                <span className="font-bold text-slate-900">{criticalCount} ({Math.round((criticalCount / total) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: `${(criticalCount / total) * 100}%` }}></div>
              </div>
            </div>

            {/* High */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-orange-700">High Risk (65-84 SVI)</span>
                <span className="font-bold text-slate-900">{highCount} ({Math.round((highCount / total) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(highCount / total) * 100}%` }}></div>
              </div>
            </div>

            {/* Moderate */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-amber-700">Moderate Risk (40-64 SVI)</span>
                <span className="font-bold text-slate-900">{modCount} ({Math.round((modCount / total) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(modCount / total) * 100}%` }}></div>
              </div>
            </div>

            {/* Low */}
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-emerald-700">Low Risk (0-39 SVI)</span>
                <span className="font-bold text-slate-900">{lowCount} ({Math.round((lowCount / total) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(lowCount / total) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Distribution Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Languages className="w-4 h-4 text-blue-600" />
              Cases by Language
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Indic BERT</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-800">Hindi (हिंदी)</span>
                <span className="font-bold text-slate-900">{hindiCount} ({Math.round((hindiCount / total) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(hindiCount / total) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-800">Marathi (मराठी)</span>
                <span className="font-bold text-slate-900">{marathiCount} ({Math.round((marathiCount / total) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(marathiCount / total) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-800">English</span>
                <span className="font-bold text-slate-900">{engCount} ({Math.round((engCount / total) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(engCount / total) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Types Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-600" />
              Intake Channel Distribution
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">14566 vs Portal</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Voice Helpline Call (14566)</span>
                  <span className="text-[10px] text-slate-500">Whisper ASR + Librosa</span>
                </div>
              </div>
              <span className="text-lg font-black text-blue-900">{voiceCount}</span>
            </div>

            <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-600 text-white rounded-lg">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Portal Text Interaction</span>
                  <span className="text-[10px] text-slate-500">Hugging Face Transformers</span>
                </div>
              </div>
              <span className="text-lg font-black text-indigo-900">{textCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
