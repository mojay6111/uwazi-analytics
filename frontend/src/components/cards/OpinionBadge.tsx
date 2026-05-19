"use client";

interface OpinionBadgeProps {
  type: "Unmodified" | "Qualified" | "Adverse" | "Disclaimer";
  count: number;
  description: string;
}

const config = {
  Unmodified: {
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.25)",
    icon: "✓",
    label: "Clean",
  },
  Qualified: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    icon: "~",
    label: "Issues Found",
  },
  Adverse: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    icon: "✗",
    label: "Serious Issues",
  },
  Disclaimer: {
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.25)",
    icon: "?",
    label: "No Evidence",
  },
};

export default function OpinionBadge({ type, count, description }: OpinionBadgeProps) {
  const c = config[type];

  return (
    <div
      style={{
        backgroundColor: "#0d1424",
        border: `1px solid ${c.border}`,
        borderRadius: "14px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          backgroundColor: c.bg,
          border: `1px solid ${c.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          color: c.color,
          fontWeight: "700",
          flexShrink: 0,
        }}
      >
        {c.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <p style={{ color: "white", fontSize: "22px", fontWeight: "800", margin: 0 }}>
            {count}
          </p>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: c.color,
              backgroundColor: c.bg,
              padding: "2px 8px",
              borderRadius: "10px",
              border: `1px solid ${c.border}`,
            }}
          >
            {c.label}
          </span>
        </div>
        <p style={{ color: "#10b981" === c.color ? "#10b981" : c.color, fontSize: "13px", fontWeight: "600", margin: 0 }}>
          {type} Opinion
        </p>
        <p style={{ color: "#64748b", fontSize: "11px", margin: "2px 0 0 0" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
