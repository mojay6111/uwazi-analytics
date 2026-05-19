"use client";

import { useState } from "react";
import { Receipt, AlertTriangle, TrendingDown, Building2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Data from OAG 2023/2024
const mdaBills = [
  { name: "Ministry of Defence", shortName: "MoD", amount: 22.9, pct: 17.6, type: "mda" },
  { name: "State Dept - Infrastructure", shortName: "SDI", amount: 18.4, pct: 14.1, type: "mda" },
  { name: "State Dept - Medical Services", shortName: "SDMS", amount: 15.2, pct: 11.7, type: "mda" },
  { name: "State Dept - Education", shortName: "SDE", amount: 12.8, pct: 9.8, type: "mda" },
  { name: "National Treasury", shortName: "NT", amount: 10.5, pct: 8.1, type: "mda" },
  { name: "State Dept - Agriculture", shortName: "SDA", amount: 9.3, pct: 7.1, type: "mda" },
  { name: "State Dept - Energy", shortName: "SDE2", amount: 8.7, pct: 6.7, type: "mda" },
  { name: "Other MDAs", shortName: "Others", amount: 32.5, pct: 24.9, type: "mda" },
];

const donorBills = [
  { name: "Kenya National Highways Authority", shortName: "KeNHA", amount: 49.99, pct: 78.0, type: "donor" },
  { name: "State Dept for Transport", shortName: "SDT", amount: 5.8, pct: 9.0, type: "donor" },
  { name: "National Irrigation Authority", shortName: "NIA", amount: 3.2, pct: 5.0, type: "donor" },
  { name: "Other Donor Projects", shortName: "Others", amount: 5.41, pct: 8.0, type: "donor" },
];

const trendData = [
  { year: "2021/22", mda: 78.3, donor: 27.7, total: 106 },
  { year: "2022/23", mda: 130.8, donor: 66.2, total: 197 },
  { year: "2023/24", mda: 130.3, donor: 64.4, total: 194.7 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "10px", padding: "12px 16px" }}>
        <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 8px 0" }}>FY {label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} style={{ color: entry.fill, fontSize: "13px", fontWeight: "600", margin: "2px 0" }}>
            {entry.name}: Ksh {entry.value}B
          </p>
        ))}
      </div>
    );
  }
  return null;
};

type TabType = "mda" | "donor";

export default function PendingBillsPage() {
  const [tab, setTab] = useState<TabType>("mda");

  const currentData = tab === "mda" ? mdaBills : donorBills;
  const currentTotal = tab === "mda" ? 130.3 : 64.4;

  const impacts = [
    { icon: "💼", title: "Business Closures", desc: "Small and micro enterprises forced to shut down due to unpaid invoices" },
    { icon: "💧", title: "Liquidity Crisis", desc: "Reduced money supply in private sector affecting economic activity" },
    { icon: "📋", title: "Tax Delays", desc: "Suppliers unable to pay taxes on time due to unpaid government bills" },
    { icon: "👷", title: "Salary Delays", desc: "Staff salaries delayed at contractor firms waiting for government payment" },
    { icon: "📈", title: "Cost Inflation", desc: "Future goods and services become more expensive to cover risk" },
    { icon: "🔄", title: "Accumulation", desc: "Unpaid bills roll over and keep growing each financial year" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
            Pending Bills
          </h1>
          <div style={{ padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "600" }}>Ksh 194.7B Outstanding</span>
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          FY 2023/2024 · Outstanding payments to contractors and suppliers
        </p>
      </div>

      {/* KPI summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Outstanding", value: "Ksh 194.7B", sub: "MDAs + Donor projects", icon: Receipt, color: "#f59e0b" },
          { label: "MDA Bills", value: "Ksh 130.3B", sub: "↓ 0.4% from last year", icon: Building2, color: "#10b981" },
          { label: "Donor Project Bills", value: "Ksh 64.4B", sub: "78% from KeNHA alone", icon: TrendingDown, color: "#ef4444" },
          { label: "Highest Single MDA", value: "Ksh 22.9B", sub: "Ministry of Defence (17.6%)", icon: AlertTriangle, color: "#8b5cf6" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "20px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: `${kpi.color}15`, border: `1px solid ${kpi.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <Icon size={18} color={kpi.color} />
              </div>
              <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 4px 0" }}>{kpi.label}</p>
              <p style={{ color: "white", fontSize: "22px", fontWeight: "800", margin: "0 0 4px 0" }}>{kpi.value}</p>
              <p style={{ color: "#475569", fontSize: "11px", margin: 0 }}>{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Trend chart */}
      <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
        <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: "0 0 4px 0" }}>
          Pending Bills Trend
        </h3>
        <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 20px 0" }}>3-year comparison in Ksh Billions</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={trendData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2744" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={{ stroke: "#1a2744" }} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}B`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="mda" name="MDA Bills" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
            <Bar dataKey="donor" name="Donor Bills" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tab switcher + breakdown */}
      <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {[
            { key: "mda" as TabType, label: "MDA Bills", total: "Ksh 130.3B", color: "#10b981" },
            { key: "donor" as TabType, label: "Donor Project Bills", total: "Ksh 64.4B", color: "#f59e0b" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "8px 16px", borderRadius: "10px", cursor: "pointer",
                border: `1px solid ${tab === t.key ? t.color : "#1a2744"}`,
                backgroundColor: tab === t.key ? `${t.color}15` : "transparent",
                color: tab === t.key ? t.color : "#64748b",
                fontSize: "13px", fontWeight: "600", transition: "all 0.15s",
              }}
            >
              {t.label} · {t.total}
            </button>
          ))}
        </div>

        <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700", margin: "0 0 16px 0" }}>
          {tab === "mda" ? "MDA" : "Donor Project"} Breakdown
        </h3>

        {/* Bills list */}
        {currentData.map((item, i) => (
          <div
            key={i}
            style={{
              marginBottom: "12px",
              padding: "14px 16px",
              borderRadius: "10px",
              backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a2744"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: "#1a2744", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: tab === "mda" ? "#10b981" : "#f59e0b" }}>
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p style={{ color: "white", fontSize: "13px", fontWeight: "600", margin: 0 }}>{item.name}</p>
                  <p style={{ color: "#475569", fontSize: "11px", margin: 0 }}>{item.shortName}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: tab === "mda" ? "#10b981" : "#f59e0b", fontSize: "15px", fontWeight: "800", margin: 0 }}>
                  Ksh {item.amount}B
                </p>
                <p style={{ color: "#475569", fontSize: "11px", margin: 0 }}>{item.pct}% of total</p>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: "4px", backgroundColor: "#1a2744", borderRadius: "2px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${item.pct}%`,
                  backgroundColor: tab === "mda" ? "#10b981" : "#f59e0b",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>
        ))}

        {/* Total row */}
        <div style={{ marginTop: "16px", padding: "14px 16px", borderRadius: "10px", backgroundColor: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "#10b981", fontSize: "13px", fontWeight: "700", margin: 0 }}>TOTAL</p>
          <p style={{ color: "white", fontSize: "16px", fontWeight: "800", margin: 0 }}>Ksh {currentTotal}B</p>
        </div>
      </div>

      {/* Impact section */}
      <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "24px" }}>
        <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: "0 0 16px 0" }}>
          Impact on Citizens & Economy
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {impacts.map((item) => (
            <div
              key={item.title}
              style={{
                padding: "16px", borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid #1a2744",
              }}
            >
              <p style={{ fontSize: "24px", margin: "0 0 8px 0" }}>{item.icon}</p>
              <p style={{ color: "white", fontSize: "13px", fontWeight: "600", margin: "0 0 4px 0" }}>{item.title}</p>
              <p style={{ color: "#64748b", fontSize: "11px", lineHeight: "1.5", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
