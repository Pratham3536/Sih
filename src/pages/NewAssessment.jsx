import React, { useState } from "react";
import { FileText, Mic, Upload, Square, Play, Sparkles, Languages, Volume2, Info, ArrowRight } from "lucide-react";
import { analyzeText } from "../services/nlpService";
import { processAudioInteraction } from "../services/speechService";
import { calculateSVI } from "../services/sviService";
import { getRecommendations } from "../services/recommendationService";
import { useCases } from "../context/CaseContext";
import { ProcessingOverlay } from "../components/ProcessingOverlay";

export const NewAssessment = ({ onCompleteAssessment }) => {
  const { addCase } = useCases();
  const [inputMode, setInputMode] = useState("text"); // "text" | "voice"
  const [language, setLanguage] = useState("Hindi");
  const [textInput, setTextInput] = useState("");
  
  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [audioFileName, setAudioFileName] = useState("");

  // Processing state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timerId, setTimerId] = useState(null);

  // Load sample demo text
  const handleLoadDemoText = () => {
    setInputMode("text");
    setLanguage("Hindi");
    setTextInput(
      "वे मुझे और मेरे परिवार को लगातार धमकी दे रहे हैं। मैं बहुत डरी हुई हूँ और मुझे घर जाने में डर लग रहा है। मुझे नहीं पता कि मदद के लिए किससे संपर्क करूँ।"
    );
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    setRecordedAudio(null);
    setAudioFileName("live_recorded_interaction_14566.wav");

    const interval = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);
    setTimerId(interval);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (timerId) clearInterval(timerId);
    setRecordedAudio({
      url: "#",
      duration: `00:${String(recordingSeconds).padStart(2, "0")}`
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFileName(file.name);
      setRecordedAudio({
        url: "#",
        duration: "00:45"
      });
    }
  };

  const handleAnalyze = async () => {
    if (inputMode === "text" && !textInput.trim()) {
      alert("Please enter narrative text or load a demo interaction.");
      return;
    }

    setIsAnalyzing(true);
  };

  const handlePipelineComplete = async () => {
    let nlpRes = {};
    let speechRes = null;
    let finalTranscript = textInput;

    if (inputMode === "voice") {
      speechRes = await processAudioInteraction(recordedAudio, language);
      finalTranscript = speechRes.transcript;
      nlpRes = await analyzeText(finalTranscript, language);
    } else {
      nlpRes = await analyzeText(textInput, language);
    }

    const sviCalculated = calculateSVI(nlpRes, speechRes);
    const recs = getRecommendations(sviCalculated.riskLevel, nlpRes);

    const newCaseObj = {
      language,
      inputType: inputMode === "voice" ? "Voice" : "Text",
      transcript: finalTranscript,
      transcriptEnglish: inputMode === "voice" && speechRes?.transcriptEnglish ? speechRes.transcriptEnglish : finalTranscript,
      audioFileName: inputMode === "voice" ? (audioFileName || "uploaded_sample.wav") : null,
      audioDuration: inputMode === "voice" ? (recordedAudio?.duration || "00:48") : null,
      nlpResults: nlpRes,
      speechResults: speechRes,
      sviScore: sviCalculated.score,
      riskLevel: sviCalculated.riskLevel,
      recommendations: recs.pathways
    };

    const createdCase = addCase(newCaseObj);
    setIsAnalyzing(false);
    onCompleteAssessment(createdCase);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Processing Animation Overlay */}
      {isAnalyzing && <ProcessingOverlay onComplete={handlePipelineComplete} />}

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            New Vulnerability Assessment
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
              SIH 2026 Core Module
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Capture victim/complainant interaction narrative via text stream or voice helpline audio.
          </p>
        </div>

        <button
          onClick={handleLoadDemoText}
          className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Load Hindi Demo Text</span>
        </button>
      </div>

      {/* Main Intake Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* Language & Input Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
          {/* Input Mode Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Intake Channel Mode
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  inputMode === "text"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Text Analysis</span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode("voice")}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  inputMode === "voice"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Voice Analysis</span>
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-blue-600" />
              Interaction Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Marathi">Marathi (मराठी)</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* TEXT MODE INTERFACE */}
        {inputMode === "text" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Victim Narrative / Complainant Interaction Transcript
              </label>
              <button
                onClick={handleLoadDemoText}
                className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1"
              >
                <span>Insert Demo Interaction Text</span>
              </button>
            </div>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              rows={6}
              placeholder="Enter victim/complainant interaction transcript here..."
              className="w-full p-4 border border-slate-300 rounded-xl text-xs text-slate-900 leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
            />
            <p className="text-[11px] text-slate-500">
              Supports multilingual text input (Hindi, Marathi, English). Hugging Face Transformer model will extract multi-label distress scores.
            </p>
          </div>
        )}

        {/* VOICE MODE INTERFACE */}
        {inputMode === "voice" && (
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-800 block">
              Helpline 14566 Voice Recording & Audio File Upload
            </label>

            <div className="p-6 border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/70 rounded-xl text-center transition-all">
              {!recordedAudio && !isRecording ? (
                <div className="space-y-3">
                  <div className="inline-flex p-3 bg-blue-100 text-blue-700 rounded-full">
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Record Live Call or Upload WAV/MP3 Audio</h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Whisper ASR will transcribe speech; Librosa will extract pitch variance, MFCCs & pause frequencies.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Record Voice Call</span>
                    </button>

                    <label className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload Audio File</span>
                      <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              ) : isRecording ? (
                <div className="space-y-4 py-2">
                  <div className="inline-flex p-3 bg-red-100 text-red-600 rounded-full animate-ping">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-red-600 font-mono">
                      RECORDING IN PROGRESS — 00:{String(recordingSeconds).padStart(2, "0")}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Live audio stream active on 14566 channel</p>
                  </div>

                  {/* Waveform Animation */}
                  <div className="flex items-center justify-center gap-1.5 h-10">
                    <div className="w-1.5 bg-red-500 rounded-full animate-wave-1"></div>
                    <div className="w-1.5 bg-red-500 rounded-full animate-wave-2"></div>
                    <div className="w-1.5 bg-red-500 rounded-full animate-wave-3"></div>
                    <div className="w-1.5 bg-red-500 rounded-full animate-wave-4"></div>
                    <div className="w-1.5 bg-red-500 rounded-full animate-wave-5"></div>
                  </div>

                  <button
                    type="button"
                    onClick={handleStopRecording}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-md"
                  >
                    <Square className="w-4 h-4 text-red-400 fill-red-400" />
                    <span>Stop Recording & Process</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 py-2">
                  <div className="inline-flex p-2.5 bg-emerald-100 text-emerald-700 rounded-full">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Audio Stream Selected: {audioFileName || "interaction_sample.wav"}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Duration: {recordedAudio.duration || "00:48"} • Language: {language}
                    </span>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRecordedAudio(null);
                        setAudioFileName("");
                      }}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Clear & Re-record
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>AI assessment will compute SVI score & suggest mapped triage pathways.</span>
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Analyze Interaction</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
