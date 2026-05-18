"use client";

import Link from "next/link";
import { BarChart3, Upload, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "64px",
        backgroundColor: "#0d1424",
        borderBottom: "1px solid #1a2744",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "16px",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 12px rgba(16,185,129,0.4)" }}>
          <BarChart3 size={20} color="white" />
        </div>
        <div>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "white" }}>Uwazi</span>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#10b981", marginLeft: "4px" }}>Analytics</span>
        </div>
      </Link>

      <div style={{ marginLeft: "8px", padding: "4px 12px", borderRadius: "20px", backgroundColor: "#1a2744", border: "1px solid #1e3a5f" }}>
        <span style={{ fontSize: "11px", color: "#64748b" }}>Kenya Public Finance Intelligence</span>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: "4px 12px", borderRadius: "20px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
        <span style={{ fontSize: "12px", color: "#10b981", fontWeight: "600" }}>FY 2023/2024</span>
      </div>

      <button style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#1a2744", border: "1px solid #1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <Bell size={16} color="#64748b" />
      </button>

      <Link href="/upload" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "8px", backgroundColor: "#10b981", textDecoration: "none", color: "white", fontSize: "13px", fontWeight: "600", boxShadow: "0 0 12px rgba(16,185,129,0.3)" }}>
        <Upload size={14} />
        Upload Report
      </Link>
    </nav>
  );
}
