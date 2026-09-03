import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Database,
  Users,
  KeyRound,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  FileSpreadsheet
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MOCK_USER_ROLES } from "../data/mockData";
import { getSystemHealth } from "../services/api";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState(MOCK_USER_ROLES[0].email);
  const [password, setPassword] = useState(MOCK_USER_ROLES[0].demoPassword);
  const [roleId, setRoleId] = useState(MOCK_USER_ROLES[0].id);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [backendStatus, setBackendStatus] = useState({ checked: false, online: false, db: "Checking..." });

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      const res = await getSystemHealth();
      if (isMounted) {
        if (res && res.success) {
          const isMongo = res.databases?.mongodb?.isConnected;
          setBackendStatus({
            checked: true,
            online: true,
            db: isMongo ? `MongoDB (${res.databases.mongodb.dbName})` : "Backend Live (MongoDB Standby)"
          });
        } else {
          setBackendStatus({ checked: true, online: false, db: "Offline Demo Mode" });
        }
      }
    };
    checkHealth();
    return () => { isMounted = false; };
  }, []);

  const handleRoleCardSelect = (role) => {
    setEmail(role.email);
    setPassword(role.demoPassword);
    setRoleId(role.id);
  };

  const handleQuickLogin = async (role) => {
    setEmail(role.email);
    setPassword(role.demoPassword);
    setRoleId(role.id);
    setIsSubmitting(true);
    await login(role.email, role.demoPassword, role.id);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password, roleId);
    setIsSubmitting(false);
  };

  const activeRoleObj = MOCK_USER_ROLES.find((r) => r.id === roleId) || MOCK_USER_ROLES[0];
  const isOfficer = activeRoleObj.id === "officer";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Dynamic Ambient Background Gradients */}
      <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none transition-colors duration-700 ${isOfficer ? "bg-amber-600/15" : "bg-blue-600/15"}`}></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl w-full relative z-10 space-y-6">
        {/* Top Header & Emblem */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md shadow-xs">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Smart India Hackathon 2026 • Problem Statement SIH26093</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>National Helpline Against Atrocities (14566)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-medium">
            AI-Based Real-Time Multilingual Stress & Trauma Assessment Platform • Ministry of Social Justice and Empowerment
          </p>

          {/* MongoDB & Server Health Pill + Credentials Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900/90 border border-slate-800 rounded-lg text-[11px] text-slate-300">
              <span className={`w-2 h-2 rounded-full ${backendStatus.online ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></span>
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Storage Link: <strong className="text-white">{backendStatus.db}</strong></span>
            </div>

            <button
              onClick={() => setShowCredentialsModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-900/40 hover:bg-indigo-900/70 border border-indigo-500/30 rounded-lg text-[11px] text-indigo-200 transition-all font-semibold"
            >
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>View 2 Dedicated Login Credentials</span>
            </button>
          </div>
        </div>

        {/* 2-Role Login Selector Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-slate-300">Choose Access Level:</span>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleRoleCardSelect(MOCK_USER_ROLES[0])}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                roleId === "viewer"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400"
                  : "bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>1. Viewer Login</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleCardSelect(MOCK_USER_ROLES[1])}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                roleId === "officer"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-1 ring-amber-400"
                  : "bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>2. Officer Login</span>
            </button>
          </div>
        </div>

        {/* Main Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: 2 Specific Login Role Cards */}
          <div className="lg:col-span-6 space-y-3 flex flex-col">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Available Access Modes (2 Types)</span>
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">1-Click Instant Sign In</span>
            </div>

            <div className="space-y-3 flex-1 flex flex-col">
              {/* 1. Viewer Role Card */}
              {(() => {
                const viewerRole = MOCK_USER_ROLES[0];
                const isSelected = roleId === viewerRole.id;
                return (
                  <div
                    key={viewerRole.id}
                    onClick={() => handleRoleCardSelect(viewerRole)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex-1 flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-900/95 border-blue-500 ring-2 ring-blue-500/40 shadow-xl shadow-blue-500/10"
                        : "bg-slate-900/60 border-slate-800 hover:bg-slate-900/90 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2.5 rounded-xl ${isSelected ? "bg-blue-600 text-white shadow-sm" : "bg-slate-800 text-blue-400"}`}>
                            <Eye className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-white">
                                {viewerRole.name}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                                Type 1: Viewer
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">{viewerRole.title}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickLogin(viewerRole);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1 shadow-xs"
                        >
                          <span>Sign In</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-300/90 leading-relaxed mt-2 mb-3">
                        {viewerRole.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Email: <strong className="text-blue-300">{viewerRole.email}</strong></span>
                        <span className="text-slate-500">Pass: {viewerRole.demoPassword}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {viewerRole.permissions.map((perm, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-blue-300 font-medium">
                            ✓ {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 2. Officer Role Card */}
              {(() => {
                const officerRole = MOCK_USER_ROLES[1];
                const isSelected = roleId === officerRole.id;
                return (
                  <div
                    key={officerRole.id}
                    onClick={() => handleRoleCardSelect(officerRole)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex-1 flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-900/95 border-amber-500 ring-2 ring-amber-500/40 shadow-xl shadow-amber-500/10"
                        : "bg-slate-900/60 border-slate-800 hover:bg-slate-900/90 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2.5 rounded-xl ${isSelected ? "bg-amber-600 text-white shadow-sm" : "bg-slate-800 text-amber-400"}`}>
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-white">
                                {officerRole.name}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                Type 2: Officer
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">{officerRole.title}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickLogin(officerRole);
                          }}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold shrink-0 transition-all flex items-center gap-1 shadow-xs"
                        >
                          <span>Sign In</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-300/90 leading-relaxed mt-2 mb-3">
                        {officerRole.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Email: <strong className="text-amber-300">{officerRole.email}</strong></span>
                        <span className="text-slate-500">Pass: {officerRole.demoPassword}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {officerRole.permissions.map((perm, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40 text-amber-300 font-medium">
                            ✓ {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Right Column: Active Role Sign In Form */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative flex flex-col justify-between">
            <div>
              <div className="mb-5 pb-4 border-b border-slate-800 flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-400" />
                    <span>Portal Official Authentication</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Signing in as: <strong className={isOfficer ? "text-amber-300" : "text-blue-300"}>{activeRoleObj.name}</strong>
                  </p>
                </div>

                <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${isOfficer ? "bg-amber-500/15 border border-amber-400/30 text-amber-300" : "bg-blue-500/15 border border-blue-400/30 text-blue-300"}`}>
                  {activeRoleObj.badge}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Official Government Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="official@nhaa14566.gov.in"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Account Password / Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Login Type / Assigned Security Role
                  </label>
                  <select
                    value={roleId}
                    onChange={(e) => {
                      const rId = e.target.value;
                      setRoleId(rId);
                      const matched = MOCK_USER_ROLES.find((r) => r.id === rId);
                      if (matched) {
                        setEmail(matched.email);
                        setPassword(matched.demoPassword);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    {MOCK_USER_ROLES.map((role, idx) => (
                      <option key={role.id} value={role.id}>
                        Type {idx + 1}: {role.name} ({role.title})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Security & Department Notice */}
                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <KeyRound className={`w-3.5 h-3.5 ${isOfficer ? "text-amber-400" : "text-blue-400"}`} />
                    <span>{activeRoleObj.department}</span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-slate-400">
                    {activeRoleObj.description}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 text-white font-bold text-xs rounded-xl shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2 ${
                    isOfficer
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-500/20"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20"
                  }`}
                >
                  {isSubmitting ? (
                    <span>Authenticating Session...</span>
                  ) : (
                    <>
                      <span>Enter as {activeRoleObj.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                JWT 24h Session Token
              </span>
              <span>PoA Act 1989 Compliant</span>
            </div>
          </div>
        </div>

        {/* Credentials Modal / Directory for 2 Logins */}
        {showCredentialsModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 max-w-xl w-full rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">2 Official System Login Credentials</h3>
                </div>
                <button
                  onClick={() => setShowCredentialsModal(false)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-slate-400">
                The platform is configured with 2 dedicated login pathways for Problem Statement <strong>SIH26093</strong>:
              </p>

              <div className="space-y-3">
                {MOCK_USER_ROLES.map((r, idx) => (
                  <div key={r.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg ${r.id === "officer" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"}`}>
                          {r.id === "officer" ? <Shield className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>Type {idx + 1}: {r.name}</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                              {r.id}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400">{r.title}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleQuickLogin(r);
                          setShowCredentialsModal(false);
                        }}
                        className={`px-3 py-1 text-white rounded-lg text-xs font-bold shadow-xs ${
                          r.id === "officer" ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500"
                        }`}
                      >
                        Use & Log In
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-900 p-2.5 rounded-lg text-slate-300">
                      <div><strong>Email:</strong> {r.email}</div>
                      <div><strong>Password:</strong> {r.demoPassword}</div>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      <strong>Permissions:</strong> {r.permissions.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-600 space-y-0.5">
          <p>National Helpline Against Atrocities (14566) • Ministry of Social Justice and Empowerment</p>
          <p>Smart India Hackathon 2026 Evaluation Prototype</p>
        </div>
      </div>
    </div>
  );
};

