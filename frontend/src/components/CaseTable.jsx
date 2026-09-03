import React, { useState } from "react";
import { Eye, Search, Filter, Mic, FileText, ArrowRight } from "lucide-react";
import { RiskBadge } from "./RiskBadge";

export const CaseTable = ({ cases = [], onSelectCase, onNewAssessment }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.victimId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = riskFilter === "All" || c.riskLevel === riskFilter;
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;

    return matchesSearch && matchesRisk && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header & Controls */}
      <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-slate-50/50">
        <div>
          <h3 className="text-base font-bold text-slate-800">Recent Victim/Complainant Cases</h3>
          <p className="text-xs text-slate-500">NHAA (14566) and Integrated Portal Interaction Database</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Case ID, Language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-44 md:w-56"
            />
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1 border border-slate-300 rounded-lg bg-white px-2 py-1 text-xs">
            <Filter className="w-3 h-3 text-slate-500" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-medium outline-none cursor-pointer"
            >
              <option value="All">All Risks</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 border border-slate-300 rounded-lg bg-white px-2 py-1 text-xs">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-medium outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Validated">Validated</option>
              <option value="Overridden">Overridden</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Case ID</th>
              <th className="py-3 px-4">Date / Time</th>
              <th className="py-3 px-4">Language</th>
              <th className="py-3 px-4">Input Channel</th>
              <th className="py-3 px-4">SVI Score</th>
              <th className="py-3 px-4">Risk Level</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCases.length > 0 ? (
              filteredCases.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                  onClick={() => onSelectCase(c)}
                >
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">{c.id}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    <div>{c.date}</div>
                    <div className="text-[10px] text-slate-400">{c.timestamp}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium border border-slate-200">
                      {c.language}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                      {c.inputType === "Voice" ? (
                        <Mic className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      )}
                      {c.inputType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 text-sm">
                    {c.sviScore}
                    <span className="text-[10px] text-slate-400 font-normal"> /100</span>
                  </td>
                  <td className="py-3 px-4">
                    <RiskBadge riskLevel={c.riskLevel} />
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        c.status === "Pending Review"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(c);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 transition-colors"
                    >
                      <span>Review</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No cases found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
