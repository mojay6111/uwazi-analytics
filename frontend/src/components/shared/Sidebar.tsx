"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  CheckSquare,
  AlertTriangle,
  Receipt,
  BookOpen,
  MessageSquare,
  Upload,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Budget & revenue overview" },
  { label: "Forecaster", href: "/forecast", icon: TrendingUp, description: "Debt & budget projections" },
  { label: "Audit Opinions", href: "/audit-opinions", icon: CheckSquare, description: "Opinion breakdown" },
  { label: "Risk Scores", href: "/risk-scores", icon: AlertTriangle, description: "MDA risk rankings" },
  { label: "Pending Bills", href: "/pending-bills", icon: Receipt, description: "Outstanding payments" },
  { label: "Civic Explainer", href: "/civic", icon: BookOpen, description: "Plain language summaries" },
  { label: "AI Chat", href: "/chat", icon: MessageSquare, description: "Ask about reports" },
];

const adminItems = [
  { label: "Upload Report", href: "/upload", icon: Upload, description: "Add new OAG report" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const NavLink = ({
    item,
  }: {
    item: { label: string; href: string; icon: any; description: string };
  }) => {
    const Icon = item.icon;
    const active = pathname === item.href;

    return (
      <Link
        href={item.href}
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "10px",
            marginBottom: "2px",
            backgroundColor: active ? "rgba(16,185,129,0.12)" : "transparent",
            border: active ? "1px solid rgba(16,185,129,0.25)" : "1px solid transparent",
            transition: "all 0.15s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            if (!active) {
              e.currentTarget.style.backgroundColor = "#1a2744";
              e.currentTarget.style.border = "1px solid #1e3a5f";
            }
          }}
          onMouseLeave={(e) => {
            if (!active) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.border = "1px solid transparent";
            }
          }}
        >
          {/* Icon box */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: active ? "rgba(16,185,129,0.2)" : "#1a2744",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={15} color={active ? "#10b981" : "#64748b"} />
          </div>

          {/* Text */}
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: active ? "600" : "500",
                color: active ? "#10b981" : "#cbd5e1",
                margin: 0,
                lineHeight: "1.2",
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#475569",
                margin: 0,
                marginTop: "1px",
                lineHeight: "1.2",
              }}
            >
              {item.description}
            </p>
          </div>

          {/* Active indicator */}
          {active && (
            <div
              style={{
                marginLeft: "auto",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                boxShadow: "0 0 6px rgba(16,185,129,0.6)",
              }}
            />
          )}
        </div>
      </Link>
    );
  };

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: "64px",
        bottom: 0,
        width: "256px",
        backgroundColor: "#0d1424",
        borderRight: "1px solid #1a2744",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Main nav */}
      <div style={{ padding: "20px 12px", flex: 1 }}>
        <p
          style={{
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "1.2px",
            color: "#334155",
            padding: "0 8px",
            marginBottom: "8px",
            textTransform: "uppercase",
          }}
        >
          Modules
        </p>
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>

      {/* Admin nav */}
      <div
        style={{
          padding: "12px",
          borderTop: "1px solid #1a2744",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "1.2px",
            color: "#334155",
            padding: "0 8px",
            marginBottom: "8px",
            textTransform: "uppercase",
          }}
        >
          Admin
        </p>
        {adminItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #1a2744",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "8px",
            borderRadius: "8px",
            backgroundColor: "#1a2744",
          }}
        >
          <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>
            Uwazi Analytics
          </p>
          <p style={{ fontSize: "10px", color: "#334155", margin: 0, marginTop: "2px" }}>
            v1.0 · OAG Kenya Data
          </p>
        </div>
      </div>
    </aside>
  );
}
