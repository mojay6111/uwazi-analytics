"use client";

import KPICard from "@/components/cards/KPICard";
import BudgetTrendChart from "@/components/charts/BudgetTrendChart";
import DebtGrowthChart from "@/components/charts/DebtGrowthChart";
import RevenueShortfallChart from "@/components/charts/RevenueShortfallChart";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Receipt,
  BarChart2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
            Dashboard
          </h1>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "20px",
              backgroundColor: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "600" }}>
              FY 2023/2024
            </span>
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Kenya National Government · OAG Audit Report Overview
        </p>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <KPICard
          title="Actual Expenditure"
          value="Ksh 4.23T"
          subtitle="vs Ksh 4.82T estimated"
          change="12% under budget"
          changeType="negative"
          icon={TrendingDown}
          iconColor="#f59e0b"
          glowColor="rgba(245,158,11,0.1)"
        />
        <KPICard
          title="Actual Revenue"
          value="Ksh 2.29T"
          subtitle="vs Ksh 2.46T budgeted"
          change="6.9% shortfall"
          changeType="negative"
          icon={DollarSign}
          iconColor="#ef4444"
          glowColor="rgba(239,68,68,0.1)"
        />
        <KPICard
          title="Public Debt"
          value="Ksh 10.58T"
          subtitle="Ceiling: Ksh 10T"
          change="Ceiling breached"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="#ef4444"
          glowColor="rgba(239,68,68,0.1)"
        />
        <KPICard
          title="Deficit"
          value="Ksh 1.59T"
          subtitle="Spending vs revenue gap"
          change="Funded by borrowing"
          changeType="negative"
          icon={BarChart2}
          iconColor="#8b5cf6"
          glowColor="rgba(139,92,246,0.1)"
        />
        <KPICard
          title="Pending Bills"
          value="Ksh 194.7B"
          subtitle="MDAs + Donor projects"
          change="↓ 0.4% from last year"
          changeType="positive"
          icon={Receipt}
          iconColor="#10b981"
          glowColor="rgba(16,185,129,0.1)"
        />
        <KPICard
          title="Debt Expenditure"
          value="Ksh 1.598T"
          subtitle="Debt servicing cost"
          change="↑ 33% from 2022/23"
          changeType="negative"
          icon={TrendingUp}
          iconColor="#ef4444"
          glowColor="rgba(239,68,68,0.1)"
        />
      </div>

      {/* Charts Row 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <BudgetTrendChart />
        <DebtGrowthChart />
      </div>

      {/* Charts Row 2 */}
      <div style={{ marginBottom: "16px" }}>
        <RevenueShortfallChart />
      </div>

      {/* Alert banner */}
      <div
        style={{
          padding: "16px 20px",
          borderRadius: "12px",
          backgroundColor: "rgba(239,68,68,0.05)",
          border: "1px solid rgba(239,68,68,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <AlertTriangle size={18} color="#ef4444" />
        <div>
          <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: "600", margin: 0 }}>
            Critical: Public debt of Ksh 10.58T exceeds the Ksh 10T parliamentary ceiling
          </p>
          <p style={{ color: "#64748b", fontSize: "12px", margin: "2px 0 0 0" }}>
            Legal Notice No.89 of 26 May, 2022 · Kshs.1.59T deficit funded through domestic and foreign borrowing
          </p>
        </div>
      </div>
    </div>
  );
}
