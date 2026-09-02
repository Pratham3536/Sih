import React, { useState } from "react";
import { Shield, Sparkles, Lock, User, LogOut, LayoutDashboard, FileSpreadsheet, PlusCircle, BarChart3, Settings, Play } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCases } from "../context/CaseContext";
import { SecurityModal } from "./SecurityModal";

export const Navbar = ({ activeTab, setActiveTab, onRunDemo }) => {
  const { user, logout } = useAuth();
  const { loadDemoCase } = useCases();
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "cases", label: "Cases", icon: FileSpreadsheet },
    { id: "new-assessment", label: "New Assessment", icon: PlusCircle },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <>
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
              <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl shadow-xs flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">NHAA 14566</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded">
                    SIH 2026 Prototype
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  AI Stress & Trauma Assessment Module • MoSJE
                </p>
              </div>
            </div>

            {/* Navigation Tabs (Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions: Demo Mode Button, Security, User Profile */}
            <div className="flex items-center gap-3">
              {/* DEMO MODE BUTTON */}
              <button
                onClick={() => {
                  loadDemoCase();
                  onRunDemo();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs rounded-lg shadow-sm transition-all animate-pulse"
                title="Run complete Hindi voice interaction demo"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>Demo Mode</span>
              </button>

              {/* Security Shield */}
              <button
                onClick={() => setShowSecurityModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
                title="View RBAC, JWT & Encryption architecture"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Security</span>
              </button>

              {/* User profile dropdown info */}
              {user && (
                <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
                  <div className="text-right hidden xl:block">
                    <div className="text-xs font-bold text-white leading-tight">{user.name}</div>
                    <div className="text-[10px] text-blue-400 font-mono font-medium capitalize">
                      {user.role} Role
                    </div>
                  </div>
                  <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-2 py-1.5 flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`p-2 rounded-lg text-[10px] flex flex-col items-center gap-1 font-semibold ${
                  isActive ? "text-blue-400 bg-slate-800" : "text-slate-400"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <SecurityModal isOpen={showSecurityModal} onClose={() => setShowSecurityModal(false)} />
    </>
  );
};
