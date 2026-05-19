"use client";

import AuditOpinionChart from "@/components/charts/AuditOpinionChart";
import OpinionBadge from "@/components/cards/OpinionBadge";
import { CheckSquare } from "lucide-react";

// Data from OAG 2023/2024 report
const totalData = [
  { name: "Unmodified", value: 248 },
  { name: "Qualified", value: 85 },
  { name: "Adverse", value: 2 },
  { name: "Disclaimer", value: 1 },
];

const mdasData = [
  { name: "Unmodified", value: 56 },
  { name: "Qualified", value: 27 },
  { name: "Adverse", value: 0 },
  { name: "Disclaimer", value: 0 },
];

const donorData = [
  { name: "Unmodified", value: 169 },
  { name: "Qualified", value: 43 },
  { name: "Adverse", value: 1 },
  { name: "Disclaimer", value: 0 },
];

const revenueData = [
  { name: "Unmodified", value: 8 },
  { name: "Qualified", value: 4 },
  { name: "Adverse", value: 0 },
  { name: "Disclaimer", value: 0 },
];

const othersData = [
  { name: "Unmodified", value: 15 },
  { name: "Qualified", value: 11 },
  { name: "Adverse", value: 1 },
  { name: "Disclaimer", value: 1 },
];

// Breakdown table data
const tableData = [
  { entity: "MDAs", unmodified: 56, qualified: 27, adverse: 0, disclaimer: 0, total: 83 },
  { entity: "Revenue Statements", unmodified: 8, qualified: 4, adverse: 0, disclaimer: 0, total: 12 },
  { entity: "Donor Funded Projects", unmodified: 169, qualified: 43, adverse: 1, disclaimer: 0, total: 213 },
  { entity: "Others", unmodified: 15, qualified: 11, adverse: 1, disclaimer: 1, total: 28 },
];

export default function AuditOpinionsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
            Audit Opinions
          </h1>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "20px",
              backgroundColor: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "600" }}>
              336 Entities Audited
            </span>
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          FY 2023/2024 · Opinion breakdown across all audited entities
        </p>
      </div>

      {/* Opinion badges */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <OpinionBadge
          type="Unmodified"
          count={248}
          description="Financial records properly kept"
        />
        <OpinionBadge
          type="Qualified"
          count={85}
          description="Issues found, not fully convincing"
        />
        <OpinionBadge
          type="Adverse"
          count={2}
          description="Records in disarray, serious issues"
        />
        <OpinionBadge
          type="Disclaimer"
          count={1}
          description="No records available to audit"
        />
      </div>

      {/* Charts grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <AuditOpinionChart data={totalData} title="All Entities" />
        <AuditOpinionChart data={mdasData} title="MDAs Only" />
        <AuditOpinionChart data={donorData} title="Donor Funded Projects" />
        <AuditOpinionChart data={othersData} title="Others" />
      </div>

      {/* Breakdown table */}
      <div
        style={{
          backgroundColor: "#0d1424",
          border: "1px solid #1a2744",
          borderRadius: "16px",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: "0 0 20px 0" }}>
          Detailed Breakdown by Entity Type
        </h3>

        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
            gap: "8px",
            padding: "10px 16px",
            backgroundColor: "#1a2744",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        >
          {["Entity Type", "Unmodified", "Qualified", "Adverse", "Disclaimer", "Total"].map((h) => (
            <p key={h} style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {h}
            </p>
          ))}
        </div>

        {/* Table rows */}
        {tableData.map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
              gap: "8px",
              padding: "14px 16px",
              borderRadius: "8px",
              marginBottom: "4px",
              backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a2744"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}
          >
            <p style={{ color: "white", fontSize: "13px", fontWeight: "600", margin: 0 }}>{row.entity}</p>
            <p style={{ color: "#10b981", fontSize: "13px", fontWeight: "700", margin: 0 }}>{row.unmodified}</p>
            <p style={{ color: "#f59e0b", fontSize: "13px", fontWeight: "700", margin: 0 }}>{row.qualified}</p>
            <p style={{ color: row.adverse > 0 ? "#ef4444" : "#334155", fontSize: "13px", fontWeight: "700", margin: 0 }}>{row.adverse}</p>
            <p style={{ color: row.disclaimer > 0 ? "#8b5cf6" : "#334155", fontSize: "13px", fontWeight: "700", margin: 0 }}>{row.disclaimer}</p>
            <p style={{ color: "white", fontSize: "13px", fontWeight: "700", margin: 0 }}>{row.total}</p>
          </div>
        ))}

        {/* Totals row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
            gap: "8px",
            padding: "14px 16px",
            borderRadius: "8px",
            marginTop: "8px",
            backgroundColor: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.15)",
          }}
        >
          <p style={{ color: "#10b981", fontSize: "13px", fontWeight: "700", margin: 0 }}>TOTAL</p>
          <p style={{ color: "#10b981", fontSize: "13px", fontWeight: "700", margin: 0 }}>248</p>
          <p style={{ color: "#f59e0b", fontSize: "13px", fontWeight: "700", margin: 0 }}>85</p>
          <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: "700", margin: 0 }}>2</p>
          <p style={{ color: "#8b5cf6", fontSize: "13px", fontWeight: "700", margin: 0 }}>1</p>
          <p style={{ color: "white", fontSize: "13px", fontWeight: "700", margin: 0 }}>336</p>
        </div>
      </div>

      {/* What opinions mean */}
      <div
        style={{
          backgroundColor: "#0d1424",
          border: "1px solid #1a2744",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: "0 0 16px 0" }}>
          What Do These Opinions Mean?
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
          }}
        >
          {[
            { type: "Unmodified", color: "#10b981", meaning: "Financial statements are accurate and properly maintained. The entity is managing public funds well." },
            { type: "Qualified", color: "#f59e0b", meaning: "Some issues were found but not serious enough to discredit all records. Specific areas need improvement." },
            { type: "Adverse", color: "#ef4444", meaning: "Records are in serious disarray. The entity cannot explain how public funds were used." },
            { type: "Disclaimer", color: "#8b5cf6", meaning: "The auditor could not form any opinion because no records were provided at all." },
          ].map((item) => (
            <div
              key={item.type}
              style={{
                padding: "16px",
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.02)",
                border: `1px solid ${item.color}20`,
              }}
            >
              <p style={{ color: item.color, fontSize: "13px", fontWeight: "700", margin: "0 0 8px 0" }}>
                {item.type}
              </p>
              <p style={{ color: "#94a3b8", fontSize: "12px", lineHeight: "1.6", margin: 0 }}>
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
