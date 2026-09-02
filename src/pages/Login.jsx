import React, { useState } from "react";
import { Shield, Lock, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { MOCK_USER_ROLES } from "../data/mockData";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("counsellor@nhaa14566.gov.in");
  const [password, setPassword] = useState("••••••••••••");
  const [roleId, setRoleId] = useState("counsellor");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, roleId);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl shadow-xl mb-3 border border-blue-400/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">NHAA 14566</h1>
          <p className="text-xs text-blue-300 font-semibold tracking-wider uppercase mt-1">
            Ministry of Social Justice and Empowerment (MoSJE)
          </p>
          <h2 className="text-sm font-bold text-slate-300 mt-2">
            AI-Based Stress & Trauma Assessment Module
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            National Helpline Against Atrocities & Integrated Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8">
          <div className="mb-5 pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              Authorized Official Sign In
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              AI-assisted vulnerability assessment for authorized personnel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                placeholder="officer@nhaa14566.gov.in"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assign System Role (RBAC)
              </label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-semibold text-slate-800"
              >
                {MOCK_USER_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name} — {role.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In to Counsellor Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-100 bg-blue-50/60 rounded-xl p-3 text-[11px] text-blue-900 flex items-start gap-2">
            <UserCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>JWT Security Enabled:</strong> Mock session token will be generated for session authentication. Zero live clinical data exposed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-[11px] text-slate-500 space-y-1">
          <p>Smart India Hackathon 2026 • Problem Statement ID: SIH26093</p>
          <p className="text-slate-400">Department of Social Justice and Empowerment</p>
        </div>
      </div>
    </div>
  );
};
