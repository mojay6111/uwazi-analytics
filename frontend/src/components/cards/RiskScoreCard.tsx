"use client";

interface RiskScoreCardProps {
  name: string;
  shortName: string;
  category: string;
  totalScore: number;
  opinionScore: number;
  pendingBillsScore: number;
  unsupportedScore: number;
  ifmisScore: number;
  riskLevel: "high" | "medium" | "low";
}

const riskConfig = {
  high: { color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.25)", label: "HIGH RISK" },
  medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", label: "MEDIUM RISK" },
  low: { color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)", label: "LOW RISK" },
};

function ScoreBar({ label, score, max = 25, color }: { label: string; score: number; max?: number; color: string }) {
  const pct = (score / max) * 100;
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ fontSize: "11px", color: "#64748b" }}>{label}</span>
        <span style={{ fontSize: "11px", color, fontWeight: "700" }}>{score}/{max}</span>
      </div>
      <div style={{ height: "4px", backgroundColor: "#1a2744", borderRadius: "2px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: color,
            borderRadius: "2px",
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function RiskScoreCard({
  name, shortName, category, totalScore,
  opinionScore, pendingBillsScore, unsupportedScore,
  ifmisScore, riskLevel,
}: RiskScoreCardProps) {
  const cfg = riskConfig[riskLevel];
  const pct = (totalScore / 100) * 100;

  return (
    <div
      style={{
        backgroundColor: "#0d1424",
        border: `1px solid ${cfg.border}`,
        borderRadius: "16px",
        padding: "20px",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <div
              style={{
                width: "32px", height: "32px", borderRadius: "8px",
                backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: "800", color: cfg.color }}>
                {shortName.slice(0, 2)}
              </span>
            </div>
            <div>
              <p style={{ color: "white", fontSize: "13px", fontWeight: "700", margin: 0 }}>{shortName}</p>
              <p style={{ color: "#475569", fontSize: "10px", margin: 0 }}>{category}</p>
            </div>
          </div>
          <p style={{ color: "#64748b", fontSize: "11px", margin: 0 }}>{name}</p>
        </div>

        {/* Risk badge */}
        <div
          style={{
            padding: "4px 10px", borderRadius: "20px",
            backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`,
          }}
        >
          <span style={{ fontSize: "10px", fontWeight: "700", color: cfg.color }}>{cfg.label}</span>
        </div>
      </div>

      {/* Score circle */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <div style={{ position: "relative", width: "64px", height: "64px", flexShrink: 0 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#1a2744" strokeWidth="6" />
            <circle
              cx="32" cy="32" r="26" fill="none"
              stroke={cfg.color} strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "800", color: cfg.color }}>{totalScore}</span>
          </div>
        </div>
        <div>
          <p style={{ color: "white", fontSize: "13px", fontWeight: "600", margin: 0 }}>Risk Score</p>
          <p style={{ color: "#475569", fontSize: "11px", margin: "2px 0 0 0" }}>out of 100 points</p>
          <p style={{ color: cfg.color, fontSize: "11px", fontWeight: "600", margin: "4px 0 0 0" }}>
            {totalScore >= 70 ? "Immediate action needed" : totalScore >= 40 ? "Monitoring required" : "Well managed"}
          </p>
        </div>
      </div>

      {/* Score bars */}
      <ScoreBar label="Audit Opinion" score={opinionScore} color={cfg.color} />
      <ScoreBar label="Pending Bills" score={pendingBillsScore} color={cfg.color} />
      <ScoreBar label="Unsupported Expenditure" score={unsupportedScore} color={cfg.color} />
      <ScoreBar label="IFMIS Compliance" score={ifmisScore} color={cfg.color} />
    </div>
  );
}
