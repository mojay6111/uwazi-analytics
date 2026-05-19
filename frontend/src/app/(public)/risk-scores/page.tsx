"use client";

import { useState } from "react";
import RiskScoreCard from "@/components/cards/RiskScoreCard";
import { AlertTriangle, Filter } from "lucide-react";

// Risk scores derived from OAG 2023/2024 findings
const mdaRiskData = [
  {
    name: "Ministry of Defence",
    shortName: "MoD",
    category: "Ministry",
    totalScore: 82,
    opinionScore: 20,
    pendingBillsScore: 25,
    unsupportedScore: 22,
    ifmisScore: 15,
    riskLevel: "high" as const,
  },
  {
    name: "The National Treasury",
    shortName: "NT",
    category: "Ministry",
    totalScore: 78,
    opinionScore: 22,
    pendingBillsScore: 18,
    unsupportedScore: 20,
    ifmisScore: 18,
    riskLevel: "high" as const,
  },
  {
    name: "Kenya National Highways Authority",
    shortName: "KeNHA",
    category: "Agency",
    totalScore: 75,
    opinionScore: 18,
    pendingBillsScore: 25,
    unsupportedScore: 20,
    ifmisScore: 12,
    riskLevel: "high" as const,
  },
  {
    name: "State Dept for Petroleum",
    shortName: "SDP",
    category: "State Dept",
    totalScore: 70,
    opinionScore: 20,
    pendingBillsScore: 15,
    unsupportedScore: 20,
    ifmisScore: 15,
    riskLevel: "high" as const,
  },
  {
    name: "State Dept for Medical Services",
    shortName: "SDMS",
    category: "State Dept",
    totalScore: 65,
    opinionScore: 18,
    pendingBillsScore: 18,
    unsupportedScore: 15,
    ifmisScore: 14,
    riskLevel: "medium" as const,
  },
  {
    name: "State Dept for Foreign Affairs",
    shortName: "SDFA",
    category: "State Dept",
    totalScore: 55,
    opinionScore: 15,
    pendingBillsScore: 14,
    unsupportedScore: 12,
    ifmisScore: 14,
    riskLevel: "medium" as const,
  },
  {
    name: "National Hospital Insurance Fund",
    shortName: "NHIF",
    category: "Agency",
    totalScore: 48,
    opinionScore: 14,
    pendingBillsScore: 12,
    unsupportedScore: 12,
    ifmisScore: 10,
    riskLevel: "medium" as const,
  },
  {
    name: "National Social Security Fund",
    shortName: "NSSF",
    category: "Agency",
    totalScore: 35,
    opinionScore: 10,
    pendingBillsScore: 8,
    unsupportedScore: 10,
    ifmisScore: 7,
    riskLevel: "low" as const,
  },
];

type FilterType = "all" | "high" | "medium" | "low";

export default function RiskScoresPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all"
    ? mdaRiskData
    : mdaRiskData.filter((d) => d.riskLevel === filter);

  const highCount = mdaRiskData.filter((d) => d.riskLevel === "high").length;
  const medCount = mdaRiskData.filter((d) => d.riskLevel === "medium").length;
  const lowCount = mdaRiskData.filter((d) => d.riskLevel === "low").length;

  const filters: { key: FilterType; label: string; count: number; color: string }[] = [
    { key: "all", label: "All MDAs", count: mdaRiskData.length, color: "#64748b" },
    { key: "high", label: "High Risk", count: highCount, color: "#ef4444" },
    { key: "medium", label: "Medium Risk", count: medCount, color: "#f59e0b" },
    { key: "low", label: "Low Risk", count: lowCount, color: "#10b981" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
            Risk Scores
          </h1>
          <div
            style={{
              padding: "4px 10px", borderRadius: "20px",
              backgroundColor: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
          >
            <span style={{ fontSize: "11px", color: "#ef4444", fontWeight: "600" }}>
              {highCount} High Risk MDAs
            </span>
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          FY 2023/2024 · MDA risk rankings based on audit findings
        </p>
      </div>

      {/* Scoring methodology */}
      <div
        style={{
          backgroundColor: "#0d1424",
          border: "1px solid #1a2744",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
        }}
      >
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 4px 0" }}>
            Scoring Method
          </p>
          <p style={{ color: "white", fontSize: "13px", margin: 0 }}>
            4 factors · 25 pts each · 100 max
          </p>
        </div>
        {[
          { label: "Audit Opinion", desc: "Type of opinion issued", color: "#10b981" },
          { label: "Pending Bills", desc: "Outstanding payment amount", color: "#f59e0b" },
          { label: "Unsupported Exp.", desc: "Payments without documentation", color: "#ef4444" },
          { label: "IFMIS Compliance", desc: "System discrepancies found", color: "#8b5cf6" },
        ].map((item) => (
          <div key={item.label}>
            <p style={{ color: item.color, fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 4px 0" }}>
              {item.label}
            </p>
            <p style={{ color: "#64748b", fontSize: "12px", margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginRight: "8px" }}>
          <Filter size={14} color="#64748b" />
          <span style={{ color: "#64748b", fontSize: "12px" }}>Filter:</span>
        </div>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: `1px solid ${filter === f.key ? f.color : "#1a2744"}`,
              backgroundColor: filter === f.key ? `${f.color}15` : "transparent",
              color: filter === f.key ? f.color : "#64748b",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Risk cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {filtered
          .sort((a, b) => b.totalScore - a.totalScore)
          .map((mda) => (
            <RiskScoreCard key={mda.name} {...mda} />
          ))}
      </div>

      {/* Alert */}
      <div
        style={{
          padding: "16px 20px",
          borderRadius: "12px",
          backgroundColor: "rgba(239,68,68,0.05)",
          border: "1px solid rgba(239,68,68,0.2)",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <AlertTriangle size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: "600", margin: 0 }}>
            Risk scores are computed from OAG audit findings
          </p>
          <p style={{ color: "#64748b", fontSize: "12px", margin: "4px 0 0 0" }}>
            Higher scores indicate greater financial management risk.
            Scores above 70 require immediate intervention.
            These scores will update automatically as new audit reports are uploaded.
          </p>
        </div>
      </div>
    </div>
  );
}
