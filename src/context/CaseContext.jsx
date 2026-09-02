import React, { createContext, useContext, useState } from "react";
import { INITIAL_CASES, DEMO_CASE } from "../data/mockData";

const CaseContext = createContext(null);

export const CaseProvider = ({ children }) => {
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem("nhaa_cases");
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [activeCase, setActiveCase] = useState(DEMO_CASE);

  const saveCasesToStorage = (updatedCases) => {
    setCases(updatedCases);
    localStorage.setItem("nhaa_cases", JSON.stringify(updatedCases));
  };

  const addCase = (newCaseData) => {
    const caseId = `NHAA-2026-${String(cases.length + 1).padStart(3, "0")}`;
    const fullCase = {
      id: caseId,
      victimId: `VIC-${Math.floor(10000 + Math.random() * 90000)} (Anonymized)`,
      date: new Date().toISOString().split("T")[0],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " IST",
      status: "Pending Review",
      review: {
        validatedBy: null,
        reviewDate: null,
        overriddenRisk: null,
        notes: ""
      },
      timeline: [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `Interaction recorded (${newCaseData.inputType})` },
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event: `Multimodal AI Assessment completed - SVI: ${newCaseData.sviScore}` }
      ],
      ...newCaseData
    };

    const updated = [fullCase, ...cases];
    saveCasesToStorage(updated);
    setActiveCase(fullCase);
    return fullCase;
  };

  const updateCaseReview = (caseId, { action, overriddenRisk, notes, userName }) => {
    const updated = cases.map((c) => {
      if (c.id === caseId) {
        const isOverride = action === "override" && overriddenRisk && overriddenRisk !== c.riskLevel;
        const newStatus = isOverride ? "Overridden" : "Validated";
        const updatedReview = {
          validatedBy: userName || "Authorized Counsellor",
          reviewDate: new Date().toLocaleString(),
          overriddenRisk: isOverride ? overriddenRisk : c.riskLevel,
          notes: notes || ""
        };
        const updatedTimeline = [
          ...c.timeline,
          {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            event: isOverride
              ? `Risk level overridden to ${overriddenRisk} by ${updatedReview.validatedBy}`
              : `Assessment validated by ${updatedReview.validatedBy}`
          }
        ];

        return {
          ...c,
          status: newStatus,
          riskLevel: isOverride ? overriddenRisk : c.riskLevel,
          review: updatedReview,
          timeline: updatedTimeline
        };
      }
      return c;
    });

    saveCasesToStorage(updated);
    const currentActive = updated.find((c) => c.id === caseId);
    if (currentActive) setActiveCase(currentActive);
  };

  const loadDemoCase = () => {
    setActiveCase(DEMO_CASE);
    return DEMO_CASE;
  };

  // Summary Metrics
  const stats = {
    total: cases.length,
    highRisk: cases.filter((c) => c.riskLevel === "High").length,
    criticalRisk: cases.filter((c) => c.riskLevel === "Critical").length,
    pendingReview: cases.filter((c) => c.status === "Pending Review").length
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        activeCase,
        setActiveCase,
        addCase,
        updateCaseReview,
        loadDemoCase,
        stats
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCases = () => useContext(CaseContext);
