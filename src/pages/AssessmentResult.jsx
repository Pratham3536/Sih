import React from "react";
import { ShieldCheck, Brain, Waves, Cpu, Sparkles, AlertTriangle, ArrowLeft, Printer, Share2 } from "lucide-react";
import { SVIGauge } from "../components/SVIGauge";
import { IndicatorCard } from "../components/IndicatorCard";
import { RecommendationCard } from "../components/RecommendationCard";
import { ReviewPanel } from "../components/ReviewPanel";
import { DisclaimerBanner } from "../components/DisclaimerBanner";
import { useCases } from "../context/CaseContext";

export const AssessmentResult = ({ activeCase, onBackToDashboard }) => {
  const { updateCaseReview } = useCases();

  if (!activeCase) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No active case selected.</p>
        <button onClick={onBackToDashboard} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleSaveReview = (reviewPayload) => {
    updateCaseReview(activeCase.id, reviewPayload);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Disclaimer */}
      <DisclaimerBanner />

      {/* Navigation & Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Counsellor Dashboard</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-slate-900">
              Vulnerability Assessment Report
            </h1>
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
              {activeCase.id}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Victim Identifier: <strong>{activeCase.victimId}</strong> • Language: <strong>{activeCase.language}</strong> • Channel: <strong>{activeCase.inputType}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Grid: SVI Score & Transcript Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: SVI Score Gauge */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col items-center justify-center text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">
            Stress Vulnerability Index
          </span>
          
          <SVIGauge score={activeCase.sviScore} riskLevel={activeCase.riskLevel} size={200} />

          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl w-full text-xs text-slate-600 text-center">
            <span className="font-semibold text-slate-800 block">AI Triage Status</span>
            <span className="font-bold text-blue-700 uppercase mt-0.5 inline-block">
              {activeCase.status}
            </span>
          </div>
        </div>

        {/* Right Column: Interaction Transcript Narrative */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-800">Victim Interaction Narrative Stream</h3>
              <p className="text-xs text-slate-500">Transcribed via OpenAI Whisper ASR / Direct Intake</p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md">
              {activeCase.language} • {activeCase.inputType}
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original Narrative:</div>
            <p className="text-sm text-slate-900 font-medium leading-relaxed italic">
              "{activeCase.transcript}"
            </p>

            {activeCase.transcriptEnglish && activeCase.language !== "English" && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">English Translation:</div>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">
                  "{activeCase.transcriptEnglish}"
                </p>
              </div>
            )}
          </div>

          {activeCase.speechResults && activeCase.speechResults.acousticFeatures && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-lg">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Pitch Frequency (F0)</span>
                <span className="text-xs font-extrabold text-blue-900">{activeCase.speechResults.acousticFeatures.pitchMeanHz} Hz</span>
              </div>
              <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-lg">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Tremor Index</span>
                <span className="text-xs font-extrabold text-blue-900">{activeCase.speechResults.acousticFeatures.tremorIndex}</span>
              </div>
              <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-lg">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Speech Rate</span>
                <span className="text-xs font-extrabold text-blue-900">{activeCase.speechResults.acousticFeatures.speechRateWpm} WPM</span>
              </div>
              <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-lg">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Pause Count</span>
                <span className="text-xs font-extrabold text-blue-900">{activeCase.speechResults.acousticFeatures.pauseCount} pauses</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Multimodal Architecture Diagram Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-800">Multimodal Signal Fusion Architecture</h3>
            <p className="text-xs text-slate-500">How text & voice signals converge into the Stress Vulnerability Index</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
            SIH Technical Pipeline
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Text Signals */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold">
              <Brain className="w-4 h-4" />
              <span>TEXT SIGNALS</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">Hugging Face Transformers (IndicBERT)</p>
            <div className="space-y-1 pt-1 text-[11px] text-slate-700">
              <div className="flex justify-between"><span>• Threat Keywords</span><span className="font-bold">Detected</span></div>
              <div className="flex justify-between"><span>• Fear Markers</span><span className="font-bold">Detected</span></div>
              <div className="flex justify-between"><span>• Isolation Terms</span><span className="font-bold">Detected</span></div>
            </div>
          </div>

          {/* Voice Signals */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-indigo-700 font-bold">
              <Waves className="w-4 h-4" />
              <span>VOICE SIGNALS</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">Whisper ASR + Librosa Audio Extraction</p>
            <div className="space-y-1 pt-1 text-[11px] text-slate-700">
              <div className="flex justify-between"><span>• Pitch Variance (F0)</span><span className="font-bold">Elevated</span></div>
              <div className="flex justify-between"><span>• MFCC Timbre Coefficients</span><span className="font-bold">Extracted</span></div>
              <div className="flex justify-between"><span>• Speech Rate & Pauses</span><span className="font-bold">Irregular</span></div>
            </div>
          </div>

          {/* Multimodal Fusion Engine */}
          <div className="p-4 bg-blue-900 text-white rounded-xl space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-blue-200 font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>MULTIMODAL FUSION</span>
            </div>
            <p className="text-[11px] text-blue-300 font-mono">Weighted Matrix & SVI Solver</p>
            <div className="pt-2 text-center border-t border-blue-800">
              <div className="text-2xl font-black text-white">{activeCase.sviScore} / 100</div>
              <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mt-0.5">
                {activeCase.riskLevel} Risk Tier
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Indicators & Mapped Support Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IndicatorCard nlpResults={activeCase.nlpResults} />
        <RecommendationCard recommendations={activeCase.recommendations} />
      </div>

      {/* HUMAN-IN-THE-LOOP REVIEW PANEL */}
      <ReviewPanel currentCase={activeCase} onSaveReview={handleSaveReview} />
    </div>
  );
};
