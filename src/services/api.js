/**
 * Unified API Client for NHAA 14566 AI Assessment System
 * 
 * ARCHITECTURE:
 * React Frontend ──► api.js ──► Express Backend Gateway ──► MongoDB / MySQL
 *                                                       └──► Hugging Face / Whisper / Librosa
 * 
 * Auto-fallback mode ensures zero downtime during presentations.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiCall = async (endpoint, method = "GET", body = null) => {
  try {
    const token = localStorage.getItem("nhaa_jwt_token");
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
    };
    if (body) options.body = JSON.stringify(body);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Graceful offline fallback
    console.warn(`[API Layer] Backend call to ${endpoint} unavailable (${error.message}). Using local engine fallback.`);
    return { isMock: true, fallback: true, error: error.message };
  }
};

// Database specific helpers
export const testMongoConnection = async (mongoUri) => {
  return await apiCall("/system/connect-mongo", "POST", { mongoUri });
};

export const getSystemHealth = async () => {
  return await apiCall("/system/status", "GET");
};

export const fetchCasesFromBackend = async () => {
  return await apiCall("/cases", "GET");
};

export const saveCaseToBackend = async (caseData) => {
  return await apiCall("/cases", "POST", caseData);
};

export const updateCaseReviewOnBackend = async (caseId, reviewPayload) => {
  return await apiCall(`/cases/${caseId}/review`, "PATCH", reviewPayload);
};

export const loginViaBackend = async (email, password, roleId) => {
  return await apiCall("/auth/login", "POST", { email, password, roleId });
};
