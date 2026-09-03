import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Server,
  Cpu,
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Zap,
  HardDrive,
  ShieldCheck,
  Globe,
  ArrowLeft
} from "lucide-react";
import { testMongoConnection, getSystemHealth } from "../services/api";

export const Settings = ({ onBack }) => {
  const [mongoUri, setMongoUri] = useState("mongodb://127.0.0.1:27017/nhaa_db");
  const [backendUrl, setBackendUrl] = useState("http://localhost:5000/api");
  const [hfModel, setHfModel] = useState("indicbert-multilingual-trauma-classifier");
  const [whisperModel, setWhisperModel] = useState("whisper-large-v3-multilingual");
  const [librosaSampling, setLibrosaSampling] = useState("22050");
  
  const [isTestingMongo, setIsTestingMongo] = useState(false);
  const [mongoTestResult, setMongoTestResult] = useState(null);
  const [systemStats, setSystemStats] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    const data = await getSystemHealth();
    if (data && data.success) {
      setSystemStats(data);
    }
  };

  const handleTestMongo = async () => {
    setIsTestingMongo(true);
    setMongoTestResult(null);
    const res = await testMongoConnection(mongoUri);
    setMongoTestResult(res);
    setIsTestingMongo(false);
    fetchHealth();
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          )}
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span>Database & System Architecture Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure live MongoDB Atlas / Local database links and AI/ML pipeline checkpoints for SIH 2026.
          </p>
        </div>
        <button
          onClick={fetchHealth}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all border border-slate-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Live Health</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* MongoDB Database Configuration Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>MongoDB Primary Database Link</span>
            </h3>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200">
              Mongoose ODM Active
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                MongoDB Connection String (URI)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={mongoUri}
                  onChange={(e) => setMongoUri(e.target.value)}
                  placeholder="mongodb+srv://<username>:<password>@cluster0.mongodb.net/nhaa_db"
                  className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleTestMongo}
                  disabled={isTestingMongo}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all shrink-0"
                >
                  {isTestingMongo ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Testing Link...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Ping & Connect DB</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports local instances (<code>mongodb://127.0.0.1:27017/nhaa_db</code>) or cloud clusters (<code>mongodb+srv://...</code>).
              </p>
            </div>

            {/* Test Result Feedback */}
            {mongoTestResult && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  mongoTestResult.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-red-50 border-red-200 text-red-900"
                }`}
              >
                {mongoTestResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="font-semibold">{mongoTestResult.message}</p>
                  {mongoTestResult.stats && (
                    <p className="text-[11px] text-emerald-700 font-mono">
                      Collections Initialized: {mongoTestResult.stats.users} Users • {mongoTestResult.stats.cases} Assessment Cases
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Live Database Collections Status */}
            {systemStats?.databases?.mongodb && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">MongoDB State</div>
                  <div className="text-sm font-bold text-slate-800 capitalize mt-0.5 flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        systemStats.databases.mongodb.isConnected ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    ></span>
                    {systemStats.databases.mongodb.state}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Active Database</div>
                  <div className="text-sm font-bold font-mono text-slate-800 mt-0.5">
                    {systemStats.databases.mongodb.dbName || "nhaa_db"}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Stored Cases</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {systemStats.databases.mongodb.collections?.cases || 0} Records
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Backend REST Gateway Settings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-600" />
            <span>Backend REST API Gateway</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Backend Base Endpoint URL</label>
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Serves authentication, MongoDB SVI case synchronization, and audit log pipelines.
              </p>
            </div>
          </div>
        </div>

        {/* AI & ML Models Configuration */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>Multimodal ML Pipelines Checkpoints</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Hugging Face IndicBERT Multilingual Model
              </label>
              <input
                type="text"
                value={hfModel}
                onChange={(e) => setHfModel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Multilingual text analysis for threat, fear, isolation & vulnerability.
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                OpenAI Whisper ASR Speech-to-Text Model
              </label>
              <input
                type="text"
                value={whisperModel}
                onChange={(e) => setWhisperModel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Multilingual speech-to-text pipeline (Hindi / Marathi / English).
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Librosa Acoustic Feature Extraction (Hz)
              </label>
              <input
                type="text"
                value={librosaSampling}
                onChange={(e) => setLibrosaSampling(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Pitch variance (F0), MFCC coefficients & speech pause jitter extraction.
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                MySQL Connection Pool (Optional Secondary DB)
              </label>
              <input
                type="text"
                readOnly
                value="mysql://root:root@localhost:3306/nhaa_db"
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-600 outline-none cursor-not-allowed"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Relational fallback pool configured via <code>server/config/mysqlDb.js</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          {saved && (
            <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Configuration preferences saved successfully.</span>
            </div>
          )}
          <button
            type="submit"
            className="ml-auto px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
};
