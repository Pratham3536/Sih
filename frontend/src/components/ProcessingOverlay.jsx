import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Cpu, Sparkles, Brain, Waves, ShieldCheck } from "lucide-react";

export const ProcessingOverlay = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Input Received & Schema Validated", detail: "Encrypting narrative stream under AES-256", icon: ShieldCheck },
    { label: "Multilingual Language Detection", detail: "Language identified: Hindi / Indic BERT tokenization", icon: Cpu },
    { label: "Hugging Face Transformer NLP Parsing", detail: "Multi-label extraction: Threat, Fear, Isolation, Vulnerability", icon: Brain },
    { label: "Whisper ASR Speech Analysis", detail: "Multilingual acoustic transcript alignment & timestamping", icon: Waves },
    { label: "Librosa Acoustic Feature Extraction", detail: "Analyzing pitch frequency (F0), MFCCs, speech rate & pauses", icon: Waves },
    { label: "Multimodal Feature Fusion Engine", detail: "Combining linguistic + acoustic distress matrices", icon: Sparkles },
    { label: "Stress Vulnerability Index (SVI 0–100)", detail: "Weighted score & risk tier classification", icon: Cpu },
    { label: "Support Recommendation Triage Mapping", detail: "Generating non-autonomous pathway recommendations", icon: CheckCircle2 }
  ];

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 350); // Fast realistic progression for demo presentation (total ~2.8s)
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStep]);

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-blue-100 text-blue-700 rounded-2xl mb-3 animate-pulse-ring">
            <Brain className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Multimodal AI Processing Pipeline</h3>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing interaction via Hugging Face, Whisper & Librosa feature engines...
          </p>
        </div>

        {/* Progress List */}
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            const isPending = idx > currentStep;

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  isCompleted
                    ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                    : isCurrent
                    ? "bg-blue-50 border-blue-300 text-blue-900 shadow-xs scale-[1.01]"
                    : "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                  )}
                  <div>
                    <div className="text-xs font-bold">{step.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{step.detail}</div>
                  </div>
                </div>

                {isCompleted && (
                  <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Done
                  </span>
                )}
                {isCurrent && (
                  <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded animate-pulse">
                    Analyzing
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Pipeline Execution</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
