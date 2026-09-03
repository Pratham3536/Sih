import React, { useState, useEffect } from "react";
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
  
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return hash || "dashboard";
  });

  // Keep state synchronized with browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab);
      } else {
        const hash = window.location.hash.replace("#", "");
        setActiveTab(hash || "dashboard");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (tab, pushHistory = true) => {
    setActiveTab(tab);
    if (pushHistory) {
      window.history.pushState({ tab }, "", "#" + tab);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo("dashboard");
    }
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  const handleSelectCase = (caseObj) => {
    setActiveCase(caseObj);
    navigateTo("case-details");
  };

  const handleCompleteAssessment = (createdCase) => {
    setActiveCase(createdCase);
    navigateTo("assessment-result");
  };

  const handleRunDemo = () => {
    const demo = loadDemoCase();
    setActiveCase(demo);
    navigateTo("assessment-result");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateTo}
        onBack={handleBack}
        canGoBack={activeTab !== "dashboard"}
        onRunDemo={handleRunDemo}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "dashboard" && (
          <Dashboard
            onNavigate={(tab) => navigateTo(tab)}
            onSelectCase={handleSelectCase}
            onRunDemo={handleRunDemo}
          />
        )}

        {activeTab === "cases" && (
          <div className="space-y-6">
            <Dashboard
              onNavigate={(tab) => navigateTo(tab)}
              onSelectCase={handleSelectCase}
              onRunDemo={handleRunDemo}
            />
          </div>
        )}

        {activeTab === "new-assessment" && (
          <NewAssessment
            onCompleteAssessment={handleCompleteAssessment}
            onBack={handleBack}
          />
        )}

        {activeTab === "assessment-result" && (
          <AssessmentResult
            activeCase={activeCase}
            onBackToDashboard={handleBack}
          />
        )}

        {activeTab === "case-details" && (
          <CaseDetails
            caseData={activeCase}
            onBack={handleBack}
          />
        )}

        {activeTab === "analytics" && <Analytics onBack={handleBack} />}

        {activeTab === "settings" && <Settings onBack={handleBack} />}
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

