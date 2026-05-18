"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2019/20", debt: 6.37 },
  { year: "2020/21", debt: 7.55 },
  { year: "2021/22", debt: 8.48 },
  { year: "2022/23", debt: 10.26 },
  { year: "2023/24", debt: 10.58 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const breached = payload[0].value > 10;
    return (
      <div
        style={{
          backgroundColor: "#0d1424",
          border: `1px solid ${breached ? "#ef4444" : "#1a2744"}`,
          borderRadius: "10px",
          padding: "12px 16px",
        }}
      >
        <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 6px 0" }}>
          FY {label}
        </p>
        <p style={{ color: breached ? "#ef4444" : "#10b981", fontSize: "14px", fontWeight: "700", margin: 0 }}>
          Ksh {payload[0].value}T
        </p>
        {breached && (
          <p style={{ color: "#ef4444", fontSize: "11px", margin: "4px 0 0 0" }}>
            ⚠ Exceeds Ksh 10T ceiling
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function DebtGrowthChart() {
  return (
    <div
      style={{
        backgroundColor: "#0d1424",
        border: "1px solid #1a2744",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: 0 }}>
            Public Debt Growth
          </h3>
          <p style={{ color: "#64748b", fontSize: "12px", margin: "4px 0 0 0" }}>
            5-year trend in Ksh Trillions
          </p>
        </div>
        <div
          style={{
            padding: "4px 10px",
            borderRadius: "20px",
            backgroundColor: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <span style={{ fontSize: "11px", color: "#ef4444", fontWeight: "600" }}>
            ⚠ Ceiling Breached
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="debtGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2744" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={{ stroke: "#1a2744" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}T`}
            domain={[5, 12]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={10}
            stroke="#ef4444"
            strokeDasharray="6 3"
            label={{
              value: "Ksh 10T Ceiling",
              fill: "#ef4444",
              fontSize: 11,
              position: "insideTopRight",
            }}
          />
          <Area
            type="monotone"
            dataKey="debt"
            stroke="#ef4444"
            strokeWidth={2.5}
            fill="url(#debtGradient)"
            dot={{ fill: "#ef4444", r: 5, strokeWidth: 0 }}
            activeDot={{ r: 7, fill: "#ef4444" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
