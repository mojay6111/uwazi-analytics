"use client";

import { useState, useRef } from "react";
import {
  Upload, FileText, CheckCircle, AlertCircle,
  Loader2, X, Info, Database, Brain, BarChart2
} from "lucide-react";

type UploadStatus = "idle" | "uploading" | "extracting" | "storing" | "done" | "error";

interface UploadedFile {
  name: string;
  size: number;
  year: string;
  status: UploadStatus;
  message?: string;
}

const statusConfig: Record<UploadStatus, { color: string; label: string; icon: any }> = {
  idle: { color: "#64748b", label: "Ready", icon: FileText },
  uploading: { color: "#3b82f6", label: "Uploading...", icon: Loader2 },
  extracting: { color: "#f59e0b", label: "Extracting data...", icon: Brain },
  storing: { color: "#8b5cf6", label: "Storing to database...", icon: Database },
  done: { color: "#10b981", label: "Complete", icon: CheckCircle },
  error: { color: "#ef4444", label: "Error", icon: AlertCircle },
};

const processingSteps = [
  { icon: FileText, label: "PDF Upload", desc: "Report uploaded to server" },
  { icon: Brain, label: "AI Extraction", desc: "Claude reads and extracts structured data" },
  { icon: Database, label: "Data Storage", desc: "Figures stored in PostgreSQL" },
  { icon: BarChart2, label: "Dashboard Update", desc: "All modules updated with new data" },
];

const supportedReports = [
  { name: "National Government Popular Report", years: "2019–2024", status: "supported" },
  { name: "County Government Report", years: "Coming soon", status: "coming" },
  { name: "Judiciary Audit Report", years: "Coming soon", status: "coming" },
  { name: "Parliament Audit Report", years: "Coming soon", status: "coming" },
];

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [year, setYear] = useState("2023/2024");
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setFile({
        name: f.name, size: f.size, year,
        status: "error", message: "Only PDF files are supported",
      });
      return;
    }
    setFile({ name: f.name, size: f.size, year, status: "idle" });
    if (!title) setTitle(`OAG National Government Report ${year}`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const simulateUpload = async () => {
    if (!file) return;

    const steps: UploadStatus[] = ["uploading", "extracting", "storing", "done"];
    const delays = [1500, 2500, 1500, 0];

    for (let i = 0; i < steps.length; i++) {
      setFile((prev) => prev ? { ...prev, status: steps[i] } : null);
      if (delays[i]) await new Promise((r) => setTimeout(r, delays[i]));
    }

    setFile((prev) => prev ? {
      ...prev, status: "done",
      message: "Report successfully processed. All modules updated.",
    } : null);
  };

  const reset = () => {
    setFile(null);
    setTitle("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
            Upload Report
          </h1>
          <div style={{ padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <span style={{ fontSize: "11px", color: "#8b5cf6", fontWeight: "600" }}>Admin Portal</span>
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Upload a new OAG audit report PDF to update all platform modules
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>
        {/* Left - Upload area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Report metadata */}
          <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700", margin: "0 0 16px 0" }}>
              Report Details
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
                  Report Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. OAG National Government Report 2023/2024"
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    backgroundColor: "#1a2744", border: "1px solid #1e3a5f",
                    color: "white", fontSize: "13px", outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "8px" }}>
                  Financial Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: "8px",
                    backgroundColor: "#1a2744", border: "1px solid #1e3a5f",
                    color: "white", fontSize: "13px", outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  {["2023/2024", "2022/2023", "2021/2022", "2020/2021", "2019/2020"].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Drop zone */}
          {!file && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? "#10b981" : "#1e3a5f"}`,
                borderRadius: "16px", padding: "60px 24px",
                textAlign: "center", cursor: "pointer",
                backgroundColor: dragOver ? "rgba(16,185,129,0.05)" : "#0d1424",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Upload size={28} color="#10b981" />
              </div>
              <p style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: "0 0 8px 0" }}>
                Drop your PDF here
              </p>
              <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px 0" }}>
                or click to browse files
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "20px", backgroundColor: "#1a2744", border: "1px solid #1e3a5f" }}>
                <FileText size={12} color="#64748b" />
                <span style={{ color: "#64748b", fontSize: "11px" }}>PDF files only · Max 50MB</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                style={{ display: "none" }}
                onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
              />
            </div>
          )}

          {/* File card */}
          {file && (
            <div style={{ backgroundColor: "#0d1424", border: `1px solid ${statusConfig[file.status].color}40`, borderRadius: "16px", padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                {/* File icon */}
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={24} color="#ef4444" />
                </div>

                {/* File info */}
                <div style={{ flex: 1 }}>
                  <p style={{ color: "white", fontSize: "14px", fontWeight: "700", margin: "0 0 4px 0" }}>{file.name}</p>
                  <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 12px 0" }}>
                    {formatSize(file.size)} · FY {file.year}
                  </p>

                  {/* Status */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {(() => {
                      const cfg = statusConfig[file.status];
                      const Icon = cfg.icon;
                      return (
                        <>
                          <Icon
                            size={14}
                            color={cfg.color}
                            style={file.status === "uploading" || file.status === "extracting" || file.status === "storing"
                              ? { animation: "spin 1s linear infinite" } : {}}
                          />
                          <span style={{ color: cfg.color, fontSize: "12px", fontWeight: "600" }}>{cfg.label}</span>
                        </>
                      );
                    })()}
                  </div>

                  {file.message && (
                    <p style={{ color: file.status === "done" ? "#10b981" : "#ef4444", fontSize: "12px", margin: "8px 0 0 0" }}>
                      {file.message}
                    </p>
                  )}
                </div>

                {/* Remove button */}
                {file.status === "idle" || file.status === "error" || file.status === "done" ? (
                  <button
                    onClick={reset}
                    style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: "#1a2744", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <X size={14} color="#64748b" />
                  </button>
                ) : null}
              </div>

              {/* Progress steps */}
              {file.status !== "idle" && file.status !== "error" && (
                <div style={{ marginTop: "20px", display: "flex", gap: "4px" }}>
                  {(["uploading", "extracting", "storing", "done"] as UploadStatus[]).map((s, i) => {
                    const steps = ["uploading", "extracting", "storing", "done"];
                    const currentIdx = steps.indexOf(file.status);
                    const isComplete = i < currentIdx || file.status === "done";
                    const isCurrent = i === currentIdx && file.status !== "done";
                    return (
                      <div
                        key={s}
                        style={{
                          flex: 1, height: "4px", borderRadius: "2px",
                          backgroundColor: isComplete || isCurrent ? "#10b981" : "#1a2744",
                          opacity: isCurrent ? 0.6 : 1,
                          transition: "background-color 0.3s",
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Action buttons */}
              <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                {file.status === "idle" && (
                  <button
                    onClick={simulateUpload}
                    style={{
                      padding: "10px 20px", borderRadius: "8px", cursor: "pointer",
                      backgroundColor: "#10b981", border: "none",
                      color: "white", fontSize: "13px", fontWeight: "600",
                      display: "flex", alignItems: "center", gap: "8px",
                    }}
                  >
                    <Upload size={14} />
                    Process Report
                  </button>
                )}
                {file.status === "done" && (
                  <button
                    onClick={reset}
                    style={{
                      padding: "10px 20px", borderRadius: "8px", cursor: "pointer",
                      backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
                      color: "#10b981", fontSize: "13px", fontWeight: "600",
                    }}
                  >
                    Upload Another Report
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Processing pipeline */}
          <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "20px" }}>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: "700", margin: "0 0 16px 0" }}>
              Processing Pipeline
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {processingSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#1a2744", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} color="#10b981" />
                    </div>
                    <div>
                      <p style={{ color: "white", fontSize: "12px", fontWeight: "600", margin: 0 }}>{step.label}</p>
                      <p style={{ color: "#475569", fontSize: "11px", margin: "2px 0 0 0" }}>{step.desc}</p>
                    </div>
                    {i < processingSteps.length - 1 && (
                      <div style={{ position: "absolute", left: "36px", marginTop: "32px", width: "1px", height: "12px", backgroundColor: "#1a2744" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Supported reports */}
          <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "20px" }}>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: "700", margin: "0 0 16px 0" }}>
              Supported Reports
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {supportedReports.map((r) => (
                <div
                  key={r.name}
                  style={{
                    padding: "10px 12px", borderRadius: "8px",
                    backgroundColor: r.status === "supported" ? "rgba(16,185,129,0.05)" : "transparent",
                    border: `1px solid ${r.status === "supported" ? "rgba(16,185,129,0.15)" : "#1a2744"}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: r.status === "supported" ? "white" : "#475569", fontSize: "12px", fontWeight: "600", margin: 0 }}>
                      {r.name}
                    </p>
                    <span style={{
                      fontSize: "9px", fontWeight: "700", padding: "2px 6px", borderRadius: "4px",
                      backgroundColor: r.status === "supported" ? "rgba(16,185,129,0.2)" : "#1a2744",
                      color: r.status === "supported" ? "#10b981" : "#475569",
                    }}>
                      {r.status === "supported" ? "READY" : "SOON"}
                    </span>
                  </div>
                  <p style={{ color: "#475569", fontSize: "10px", margin: "2px 0 0 0" }}>{r.years}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div style={{ padding: "16px", borderRadius: "12px", backgroundColor: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <Info size={14} color="#3b82f6" style={{ flexShrink: 0, marginTop: "1px" }} />
              <div>
                <p style={{ color: "#3b82f6", fontSize: "12px", fontWeight: "600", margin: "0 0 4px 0" }}>
                  Document Intelligence
                </p>
                <p style={{ color: "#64748b", fontSize: "11px", lineHeight: "1.5", margin: 0 }}>
                  Once connected to the backend, uploaded reports will be automatically processed by Claude AI to extract all figures, findings and recommendations into the database.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #334155; }
        input:focus { border-color: #10b981 !important; }
        select option { background-color: #1a2744; }
      `}</style>
    </div>
  );
}
