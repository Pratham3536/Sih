import React from "react";
import { PlusCircle, FileText, AlertTriangle, ShieldAlert, Clock, Play, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCases } from "../context/CaseContext";
import { CaseTable } from "../components/CaseTable";
import { DisclaimerBanner } from "../components/DisclaimerBanner";

export const Dashboard = ({ onNavigate, onSelectCase, onRunDemo }) => {
  const { user } = useAuth();
  const { cases, stats, loadDemoCase } = useCases();

  const statCards = [
    {
      title: "Total Cases Recorded",
      value: stats.total || 128,
      subtitle: "Helpline 14566 + Portal",
      icon: FileText,
      color: "bg-blue-500",
      bgLight: "bg-blue-50 border-blue-200"
    },
    {
      title: "High Risk Cases",
      value: stats.highRisk || 18,
      subtitle: "SVI Score 65 - 84",
      icon: AlertTriangle,
      color: "bg-orange-500",
      bgLight: "bg-orange-50 border-orange-200"
    },
    {
      title: "Critical Risk Cases",
      value: stats.criticalRisk || 6,
      subtitle: "SVI Score 85 - 100",
      icon: ShieldAlert,
      color: "bg-red-600",
      bgLight: "bg-red-50 border-red-200"
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReview || 12,
      subtitle: "Awaiting Human Validation",
      icon: Clock,
      color: "bg-amber-500",
      bgLight: "bg-amber-50 border-amber-200"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Header Banner & Quick CTAs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">
              Counsellor & Officer Dashboard
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
              {user?.roleTitle || "Trauma Counsellor"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time multimodal stress and vulnerability assessment triage for victim interactions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              loadDemoCase();
              onRunDemo();
            }}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Run Benchmark Hindi Demo</span>
          </button>

          <button
            onClick={() => onNavigate("new-assessment")}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Assessment</span>
          </button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`p-4 rounded-xl border ${card.bgLight} transition-all hover:shadow-xs`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{card.title}</span>
                <div className={`p-2 rounded-lg text-white ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">{card.value}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">{card.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Main Cases Table */}
      <CaseTable
        cases={cases}
        onSelectCase={onSelectCase}
        onNewAssessment={() => onNavigate("new-assessment")}
      />
    </div>
  );
};
