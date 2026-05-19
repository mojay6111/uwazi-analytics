"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = {
  Unmodified: "#10b981",
  Qualified: "#f59e0b",
  Adverse: "#ef4444",
  Disclaimer: "#8b5cf6",
};

interface OpinionData {
  name: string;
  value: number;
}

interface AuditOpinionChartProps {
  data: OpinionData[];
  title: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div
        style={{
          backgroundColor: "#0d1424",
          border: "1px solid #1a2744",
          borderRadius: "10px",
          padding: "12px 16px",
        }}
      >
        <p style={{ color: item.payload.fill, fontSize: "13px", fontWeight: "700", margin: 0 }}>
          {item.name}
        </p>
        <p style={{ color: "white", fontSize: "20px", fontWeight: "800", margin: "4px 0 0 0" }}>
          {item.value}
        </p>
        <p style={{ color: "#64748b", fontSize: "11px", margin: "2px 0 0 0" }}>
          {((item.value / item.payload.total) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginTop: "8px" }}>
    {payload.map((entry: any) => (
      <div key={entry.value} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: entry.color }} />
        <span style={{ fontSize: "11px", color: "#94a3b8" }}>{entry.value}</span>
      </div>
    ))}
  </div>
);

export default function AuditOpinionChart({ data, title }: AuditOpinionChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const dataWithTotal = data.map((d) => ({ ...d, total, fill: COLORS[d.name as keyof typeof COLORS] }));

  return (
    <div
      style={{
        backgroundColor: "#0d1424",
        border: "1px solid #1a2744",
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700", margin: "0 0 4px 0" }}>
        {title}
      </h3>
      <p style={{ color: "#64748b", fontSize: "12px", margin: "0 0 16px 0" }}>
        Total: {total} entities
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {dataWithTotal.map((entry, index) => (
              <Cell key={index} fill={entry.fill} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label */}
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <p style={{ color: "#10b981", fontSize: "24px", fontWeight: "800", margin: 0 }}>
          {((dataWithTotal.find(d => d.name === "Unmodified")?.value || 0) / total * 100).toFixed(0)}%
        </p>
        <p style={{ color: "#64748b", fontSize: "11px", margin: "2px 0 0 0" }}>
          Clean opinions
        </p>
      </div>
    </div>
  );
}
