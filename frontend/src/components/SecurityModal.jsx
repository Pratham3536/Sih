import React from "react";
import { ShieldCheck, Lock, Key, FileCheck, EyeOff, Activity, X } from "lucide-react";

export const SecurityModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const securityFeatures = [
    {
      title: "Role-Based Access Control (RBAC)",
      desc: "Granular access restrictions enforcing strict boundaries between Counsellors, Protection Officers, and System Administrators.",
      icon: Key
    },
    {
      title: "JWT Authentication & Session Tokens",
      desc: "Cryptographically signed JWT bearer tokens for secure stateful sessions across NHAA and Integrated Portal backend microservices.",
      icon: Lock
    },
    {
      title: "AES-256 & TLS 1.3 Data Encryption",
      desc: "End-to-end encryption for stored victim narratives, voice recordings, and transit endpoints in compliance with government security norms.",
      icon: ShieldCheck
    },
    {
      title: "Explicit Victim Consent Framework",
      desc: "Mandatory intake consent verification prior to processing voice/text interactions for automated stress analysis.",
      icon: FileCheck
    },
    {
      title: "Comprehensive Audit Logging",
      desc: "Immutable timestamped trail of every case creation, AI calculation, risk validation, and human override action.",
      icon: Activity
    },
    {
      title: "Data Minimization & PII Anonymization",
      desc: "Strict redaction of personally identifiable information (PII). All cases use anonymized IDs (e.g. VIC-84920) in analytical modules.",
      icon: EyeOff
    }
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Security & Privacy Architecture</h3>
            <p className="text-xs text-slate-500">Government Data Protection & Ethical AI Compliance Standard</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <strong>Security Mandate:</strong> Sensitive victim case information is accessible only to authorized roles. The AI model operates within strict privacy boundaries without storing unencrypted raw biometrics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-96 overflow-y-auto pr-1">
          {securityFeatures.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <h4 className="text-xs font-bold text-slate-800">{sec.title}</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{sec.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>MoSJE Security Standard • SIH 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-bold text-xs shadow-xs"
          >
            Close Security Overview
          </button>
        </div>
      </div>
    </div>
  );
};
