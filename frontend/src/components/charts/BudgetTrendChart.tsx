"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2019/20", estimated: 3.16, actual: 2.91 },
  { year: "2020/21", estimated: 3.38, actual: 3.21 },
  { year: "2021/22", estimated: 3.83, actual: 3.47 },
  { year: "2022/23", estimated: 4.07, actual: 3.61 },
  { year: "2023/24", estimated: 4.82, actual: 4.23 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#0d1424",
          border: "1px solid #1a2744",
          borderRadius: "10px",
          padding: "12px 16px",
        }}
      >
        <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 8px 0" }}>
          FY {label}
        </p>
        {payload.map((entry: any) => (
          <p
            key={entry.name}
            style={{ color: entry.color, fontSize: "13px", margin: "2px 0", fontWeight: "600" }}
          >
            {entry.name}: Ksh {entry.value}T
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BudgetTrendChart() {
  return (
    <div
      style={{
        backgroundColor: "#0d1424",
        border: "1px solid #1a2744",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "white", fontSize: "16px", fontWeight: "700", margin: 0 }}>
          Budget vs Actual Expenditure
        </h3>
        <p style={{ color: "#64748b", fontSize: "12px", margin: "4px 0 0 0" }}>
          5-year trend in Ksh Trillions
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} barGap={4}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1a2744"
            vertical={false}
          />
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
            domain={[2, 5.5]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#64748b", paddingTop: "16px" }}
          />
          <Bar
            dataKey="estimated"
            name="Estimated"
            fill="#1e3a5f"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="actual"
            name="Actual"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Line
            type="monotone"
            dataKey="estimated"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Estimated Trend"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
            name="Actual Trend"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
