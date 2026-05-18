"use client";

import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  glowColor?: string;
}

export default function KPICard({
  title,
  value,
  subtitle,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "#10b981",
  glowColor = "rgba(16,185,129,0.15)",
}: KPICardProps) {
  const changeColor =
    changeType === "positive"
      ? "#10b981"
      : changeType === "negative"
      ? "#ef4444"
      : "#64748b";

  return (
    <div
      style={{
        backgroundColor: "#0d1424",
        border: "1px solid #1a2744",
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = iconColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1a2744";
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "120px",
          background: glowColor,
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          backgroundColor: glowColor,
          border: `1px solid ${iconColor}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Icon size={22} color={iconColor} />
      </div>

      {/* Title */}
      <p
        style={{
          fontSize: "12px",
          color: "#64748b",
          fontWeight: "600",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          margin: 0,
          marginBottom: "8px",
        }}
      >
        {title}
      </p>

      {/* Value */}
      <p
        style={{
          fontSize: "28px",
          fontWeight: "700",
          color: "white",
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </p>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            fontSize: "12px",
            color: "#475569",
            margin: 0,
            marginTop: "6px",
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Change */}
      {change && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "12px",
            padding: "3px 8px",
            borderRadius: "20px",
            backgroundColor: `${changeColor}15`,
            border: `1px solid ${changeColor}30`,
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: changeColor,
            }}
          >
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
