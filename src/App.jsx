import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CaseProvider, useCases } from "./context/CaseContext";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { NewAssessment } from "./pages/NewAssessment";
import { AssessmentResult } from "./pages/AssessmentResult";
import { CaseDetails } from "./pages/CaseDetails";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";

const MainAppContent = () => {
  const { isAuthenticated } = useAuth();
  const { activeCase, setActiveCase, cases, loadDemoCase } = useCases();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleSelectCase = (caseObj) => {
    setActiveCase(caseObj);
    setActiveTab("case-details");
  };

  const handleCompleteAssessment = (createdCase) => {
    setActiveCase(createdCase);
    setActiveTab("assessment-result");
  };

  const handleRunDemo = () => {
    const demo = loadDemoCase();
    setActiveCase(demo);
    setActiveTab("assessment-result");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunDemo={handleRunDemo}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "dashboard" && (
          <Dashboard
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectCase={handleSelectCase}
            onRunDemo={handleRunDemo}
          />
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <Dashboard
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectCase={handleSelectCase}
              onRunDemo={handleRunDemo}
            />
          </div>
        )}

        {activeTab === "new-assessment" && (
          <NewAssessment onCompleteAssessment={handleCompleteAssessment} />
        )}

        {activeTab === "assessment-result" && (
          <AssessmentResult
            activeCase={activeCase}
            onBackToDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "case-details" && (
          <CaseDetails
            caseData={activeCase}
            onBack={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "analytics" && <Analytics />}

        {activeTab === "settings" && <Settings />}
      </main>

      <footer className="bg-slate-900 text-slate-400 text-[11px] py-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>Smart India Hackathon 2026 Prototype</strong> • Problem Statement ID: <strong>SIH26093</strong>
          </div>
          <div>
            Ministry of Social Justice and Empowerment (MoSJE) • NHAA Helpline (14566)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CaseProvider>
        <MainAppContent />
      </CaseProvider>
    </AuthProvider>
  );
}
