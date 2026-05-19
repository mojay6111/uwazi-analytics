"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, AlertTriangle, Info } from "lucide-react";

// Historical data
const historicalDebt = [
  { year: "2019/20", value: 6.37, type: "historical" },
  { year: "2020/21", value: 7.55, type: "historical" },
  { year: "2021/22", value: 8.48, type: "historical" },
  { year: "2022/23", value: 10.26, type: "historical" },
  { year: "2023/24", value: 10.58, type: "historical" },
];

const historicalRevenue = [
  { year: "2019/20", value: 1.62 },
  { year: "2020/21", value: 1.60 },
  { year: "2021/22", value: 1.94 },
  { year: "2022/23", value: 2.06 },
  { year: "2023/24", value: 2.29 },
];

const historicalExpenditure = [
  { year: "2019/20", value: 2.91 },
  { year: "2020/21", value: 3.21 },
  { year: "2021/22", value: 3.47 },
  { year: "2022/23", value: 3.61 },
  { year: "2023/24", value: 4.23 },
];

// Simple linear projection function
function project(data: number[], years: number, growthAdj: number = 0): number[] {
  const n = data.length;
  const avgGrowth = data.slice(1).reduce((sum, v, i) => sum + (v - data[i]) / data[i], 0) / (n - 1);
  const adjustedGrowth = avgGrowth + growthAdj;
  const last = data[n - 1];
  return Array.from({ length: years }, (_, i) => parseFloat((last * Math.pow(1 + adjustedGrowth, i + 1)).toFixed(2)));
}

const futureYears = ["2024/25", "2025/26", "2026/27", "2027/28", "2028/29"];

type ScenarioType = "baseline" | "optimistic" | "pessimistic";

const scenarioConfig = {
  baseline: { label: "Baseline", adj: 0, color: "#f59e0b", desc: "Current trend continues unchanged" },
  optimistic: { label: "Optimistic", adj: -0.03, color: "#10b981", desc: "Revenue reforms + fiscal discipline" },
  pessimistic: { label: "Pessimistic", adj: 0.03, color: "#ef4444", desc: "Continued borrowing + revenue shortfalls" },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "10px", padding: "12px 16px" }}>
        <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 8px 0" }}>FY {label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color, fontSize: "13px", fontWeight: "600", margin: "2px 0" }}>
            {entry.name}: Ksh {entry.value}T
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ForecastPage() {
  const [scenario, setScenario] = useState<ScenarioType>("baseline");
  const [indicator, setIndicator] = useState<"debt" | "revenue" | "expenditure">("debt");

  const cfg = scenarioConfig[scenario];

  // Build combined historical + projected data
  const buildChartData = () => {
    const historical =
      indicator === "debt" ? historicalDebt.map(d => d.value) :
      indicator === "revenue" ? historicalRevenue.map(d => d.value) :
      historicalExpenditure.map(d => d.value);

    const projected = project(historical, 5, cfg.adj);

    const histData = (
      indicator === "debt" ? historicalDebt :
      indicator === "revenue" ? historicalRevenue :
      historicalExpenditure
    ).map(d => ({
      year: d.year,
      historical: d.value,
      projected: null,
      optimistic: null,
      pessimistic: null,
    }));

    // Add bridge point
    const lastHist = histData[histData.length - 1];
    const bridgeValue = historical[historical.length - 1];

    const projData = futureYears.map((year, i) => {
      const baseProj = project(historical, 5, 0)[i];
      const optProj = project(historical, 5, -0.03)[i];
      const pesProj = project(historical, 5, 0.03)[i];
      return {
        year,
        historical: null,
        projected: scenario === "baseline" ? baseProj : scenario === "optimistic" ? optProj : pesProj,
        optimistic: optProj,
        pessimistic: pesProj,
      };
    });

    return [...histData, ...projData];
  };

  const chartData = buildChartData();

  const lastHistorical =
    indicator === "debt" ? 10.58 :
    indicator === "revenue" ? 2.29 :
    4.23;

  const projected2029 = project(
    indicator === "debt" ? historicalDebt.map(d => d.value) :
    indicator === "revenue" ? historicalRevenue.map(d => d.value) :
    historicalExpenditure.map(d => d.value),
    5, cfg.adj
  )[4];

  const unit = "T";
  const indicatorLabel =
    indicator === "debt" ? "Public Debt" :
    indicator === "revenue" ? "Ordinary Revenue" :
    "Government Expenditure";

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
            Forecaster
          </h1>
          <div style={{ padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
            <span style={{ fontSize: "11px", color: "#3b82f6", fontWeight: "600" }}>5-Year Projection</span>
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Based on OAG historical data 2019–2024 · Linear trend projection
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          backgroundColor: "#0d1424", border: "1px solid #1a2744",
          borderRadius: "16px", padding: "20px", marginBottom: "24px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px",
        }}
      >
        {/* Indicator selector */}
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 10px 0" }}>
            Indicator
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { key: "debt", label: "Public Debt", color: "#ef4444" },
              { key: "revenue", label: "Revenue", color: "#10b981" },
              { key: "expenditure", label: "Expenditure", color: "#f59e0b" },
            ].map((ind) => (
              <button
                key={ind.key}
                onClick={() => setIndicator(ind.key as any)}
                style={{
                  padding: "6px 14px", borderRadius: "8px", cursor: "pointer",
                  border: `1px solid ${indicator === ind.key ? ind.color : "#1a2744"}`,
                  backgroundColor: indicator === ind.key ? `${ind.color}15` : "transparent",
                  color: indicator === ind.key ? ind.color : "#64748b",
                  fontSize: "12px", fontWeight: "600", transition: "all 0.15s",
                }}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario selector */}
        <div>
          <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 10px 0" }}>
            Scenario
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {(Object.entries(scenarioConfig) as [ScenarioType, typeof scenarioConfig.baseline][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setScenario(key)}
                style={{
                  padding: "6px 14px", borderRadius: "8px", cursor: "pointer",
                  border: `1px solid ${scenario === key ? val.color : "#1a2744"}`,
                  backgroundColor: scenario === key ? `${val.color}15` : "transparent",
                  color: scenario === key ? val.color : "#64748b",
                  fontSize: "12px", fontWeight: "600", transition: "all 0.15s",
                }}
              >
                {val.label}
              </button>
            ))}
          </div>
          <p style={{ color: "#475569", fontSize: "11px", margin: "8px 0 0 0" }}>{cfg.desc}</p>
        </div>
      </div>

      {/* Projection summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Current (2023/24)", value: `Ksh ${lastHistorical}T`, color: "#64748b", sub: "Actual figure" },
          { label: "Projected (2028/29)", value: `Ksh ${projected2029}T`, color: cfg.color, sub: `${cfg.label} scenario` },
          { label: "Change", value: `+${(projected2029 - lastHistorical).toFixed(2)}T`, color: cfg.color, sub: `${(((projected2029 - lastHistorical) / lastHistorical) * 100).toFixed(1)}% increase` },
          {
            label: "Debt Ceiling Risk",
            value: indicator === "debt" && projected2029 > 10 ? "⚠ Exceeded" : "Within Range",
            color: indicator === "debt" && projected2029 > 10 ? "#ef4444" : "#10b981",
            sub: indicator === "debt" ? "Ksh 10T ceiling" : "N/A",
          },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              backgroundColor: "#0d1424", border: "1px solid #1a2744",
              borderRadius: "14px", padding: "18px",
            }}
          >
            <p style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 8px 0" }}>
              {card.label}
            </p>
            <p style={{ color: card.color, fontSize: "22px", fontWeight: "800", margin: "0 0 4px 0" }}>
              {card.value}
            </p>
            <p style={{ color: "#475569", fontSize: "11px", margin: 0 }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Main forecast chart */}
      <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: 0 }}>
              {indicatorLabel} Forecast
            </h3>
            <p style={{ color: "#64748b", fontSize: "12px", margin: "4px 0 0 0" }}>
              Historical (2019–2024) + Projected (2024–2029) · Ksh Trillions
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "8px", backgroundColor: "#1a2744" }}>
            <Info size={12} color="#64748b" />
            <span style={{ fontSize: "11px", color: "#64748b" }}>Dashed = projected</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2744" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: "#64748b", fontSize: 10 }}
              axisLine={{ stroke: "#1a2744" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}T`}
            />
            <Tooltip content={<CustomTooltip />} />
            {indicator === "debt" && (
              <ReferenceLine
                y={10}
                stroke="#ef4444"
                strokeDasharray="6 3"
                label={{ value: "Ksh 10T Ceiling", fill: "#ef4444", fontSize: 10, position: "insideTopRight" }}
              />
            )}
            <Line
              type="monotone"
              dataKey="historical"
              name="Historical"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ fill: "#3b82f6", r: 4 }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="projected"
              name={`${cfg.label} Projection`}
              stroke={cfg.color}
              strokeWidth={2.5}
              strokeDasharray="6 3"
              dot={{ fill: cfg.color, r: 4 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario comparison table */}
      <div style={{ backgroundColor: "#0d1424", border: "1px solid #1a2744", borderRadius: "16px", padding: "24px", marginBottom: "24px" }}>
        <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: "0 0 16px 0" }}>
          All Scenarios Comparison — {indicatorLabel}
        </h3>

        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px", padding: "10px 16px", backgroundColor: "#1a2744", borderRadius: "8px", marginBottom: "8px" }}>
          {["Year", "Optimistic", "Baseline", "Pessimistic"].map((h) => (
            <p key={h} style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</p>
          ))}
        </div>

        {futureYears.map((year, i) => {
          const hist =
            indicator === "debt" ? historicalDebt.map(d => d.value) :
            indicator === "revenue" ? historicalRevenue.map(d => d.value) :
            historicalExpenditure.map(d => d.value);

          const opt = project(hist, 5, -0.03)[i];
          const base = project(hist, 5, 0)[i];
          const pes = project(hist, 5, 0.03)[i];

          return (
            <div
              key={year}
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px",
                padding: "12px 16px", borderRadius: "8px", marginBottom: "4px",
                backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a2744"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"; }}
            >
              <p style={{ color: "white", fontSize: "13px", fontWeight: "600", margin: 0 }}>{year}</p>
              <p style={{ color: "#10b981", fontSize: "13px", fontWeight: "700", margin: 0 }}>Ksh {opt}T</p>
              <p style={{ color: "#f59e0b", fontSize: "13px", fontWeight: "700", margin: 0 }}>Ksh {base}T</p>
              <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: "700", margin: 0 }}>Ksh {pes}T</p>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div style={{ padding: "16px 20px", borderRadius: "12px", backgroundColor: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <Info size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p style={{ color: "#3b82f6", fontSize: "13px", fontWeight: "600", margin: 0 }}>
            About these projections
          </p>
          <p style={{ color: "#64748b", fontSize: "12px", margin: "4px 0 0 0" }}>
            Projections are based on linear trend analysis of OAG historical data (2019–2024).
            Optimistic scenario assumes 3% lower growth rate due to fiscal reforms.
            Pessimistic assumes 3% higher growth rate due to continued borrowing.
            As more reports are uploaded, projections will become more accurate.
          </p>
        </div>
      </div>
    </div>
  );
}
