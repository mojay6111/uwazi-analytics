"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { year: "2019/20", budgeted: 1.67, actual: 1.62, shortfall: -0.05 },
  { year: "2020/21", budgeted: 1.60, actual: 1.60, shortfall: -0.001 },
  { year: "2021/22", budgeted: 1.89, actual: 1.94, shortfall: 0.05 },
  { year: "2022/23", budgeted: 2.16, actual: 2.06, shortfall: -0.10 },
  { year: "2023/24", budgeted: 2.46, actual: 2.29, shortfall: -0.17 },
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
            style={{
              color: entry.color,
              fontSize: "13px",
              margin: "2px 0",
              fontWeight: "600",
            }}
          >
            {entry.name}: Ksh {Math.abs(entry.value).toFixed(2)}T
            {entry.name === "Shortfall" && entry.value > 0 ? " (surplus)" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueShortfallChart() {
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
          Revenue: Budgeted vs Actual
        </h3>
        <p style={{ color: "#64748b", fontSize: "12px", margin: "4px 0 0 0" }}>
          Ordinary revenue in Ksh Trillions
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barGap={4}>
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
            domain={[1, 3]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#64748b", paddingTop: "16px" }}
          />
          <Bar dataKey="budgeted" name="Budgeted" fill="#1e3a5f" radius={[4,4,0,0]} maxBarSize={40} />
          <Bar dataKey="actual" name="Actual" radius={[4,4,0,0]} maxBarSize={40}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.actual >= entry.budgeted ? "#10b981" : "#f59e0b"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
