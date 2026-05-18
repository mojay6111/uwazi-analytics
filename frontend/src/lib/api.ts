import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// =============================================
// REPORTS
// =============================================
export const getReports = () => api.get("/reports");
export const getReport = (id: string) => api.get(`/reports/${id}`);

// =============================================
// DASHBOARD
// =============================================
export const getBudgetFigures = (reportId?: string) =>
  api.get("/dashboard/budget", { params: { report_id: reportId } });

export const getRevenueFigures = (reportId?: string) =>
  api.get("/dashboard/revenue", { params: { report_id: reportId } });

export const getDebtFigures = (reportId?: string) =>
  api.get("/dashboard/debt", { params: { report_id: reportId } });

// =============================================
// AUDIT OPINIONS
// =============================================
export const getAuditOpinions = (reportId?: string) =>
  api.get("/audit-opinions", { params: { report_id: reportId } });

// =============================================
// RISK SCORES
// =============================================
export const getRiskScores = (reportId?: string) =>
  api.get("/risk-scores", { params: { report_id: reportId } });

// =============================================
// PENDING BILLS
// =============================================
export const getPendingBills = (reportId?: string) =>
  api.get("/pending-bills", { params: { report_id: reportId } });

// =============================================
// FORECAST
// =============================================
export const getForecast = (indicator: string, years: number) =>
  api.get("/forecast", { params: { indicator, years } });

// =============================================
// CIVIC
// =============================================
export const getCivicSummary = (reportId: string) =>
  api.get(`/civic/summary/${reportId}`);

// =============================================
// CHAT
// =============================================
export const sendChatMessage = (payload: {
  message: string;
  report_id?: string;
  history: { role: string; content: string }[];
}) => api.post("/chat", payload);

// =============================================
// UPLOAD
// =============================================
export const uploadReport = (formData: FormData) =>
  api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
