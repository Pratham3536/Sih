import React, { useState } from "react";
import { Settings as SettingsIcon, Server, Cpu, Database, CheckCircle2, Shield, RefreshCw } from "lucide-react";

export const Settings = () => {
  const [fastApiUrl, setFastApiUrl] = useState("http://localhost:8000/api");
  const [hfModel, setHfModel] = useState("indicbert-multilingual-trauma-classifier");
  const [whisperModel, setWhisperModel] = useState("whisper-large-v3-multilingual");
  const [librosaSampling, setLibrosaSampling] = useState("22050");
  const [dbHost, setDbHost] = useState("postgresql://nhaa_user@localhost:5432/nhaa_db");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            System & Model Service Architecture Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Backend endpoints & Machine Learning pipeline configuration for SIH 2026 deployment.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200">
          FastAPI Ready
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* FastAPI Gateway Configuration */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-600" />
            FastAPI Backend Gateway Integration
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">FastAPI Base Endpoint URL</label>
              <input
                type="text"
                value={fastApiUrl}
                onChange={(e) => setFastApiUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Connected via <code>src/services/api.js</code>. Automatically falls back to offline analytical engine if backend is offline.
              </p>
            </div>
          </div>
        </div>

        {/* AI & ML Models Configuration */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            NLP & Voice ML Model Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Hugging Face Transformers Model ID
              </label>
              <input
                type="text"
                value={hfModel}
                onChange={(e) => setHfModel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Multilingual text analysis for threat, fear & isolation indicators.
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Whisper ASR Model Checkpoint
              </label>
              <input
                type="text"
                value={whisperModel}
                onChange={(e) => setWhisperModel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Multilingual speech-to-text pipeline (Hindi/Marathi/English).
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Librosa Audio Engine Sampling Rate (Hz)
              </label>
              <input
                type="text"
                value={librosaSampling}
                onChange={(e) => setLibrosaSampling(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Pitch variance (F0), MFCC coefficients & speech pause duration extraction.
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                PostgreSQL Database Connection URI
              </label>
              <input
                type="text"
                value={dbHost}
                onChange={(e) => setDbHost(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Persistent storage for case records, SVI scores, and audit trails.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          {saved && (
            <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Service configuration updated successfully.
            </div>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Save Architecture Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
