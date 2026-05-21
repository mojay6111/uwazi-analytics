"use client";

import { useEffect, useState } from "react";
import KPICard from "@/components/cards/KPICard";
import BudgetTrendChart from "@/components/charts/BudgetTrendChart";
import DebtGrowthChart from "@/components/charts/DebtGrowthChart";
import RevenueShortfallChart from "@/components/charts/RevenueShortfallChart";
import {
  TrendingUp, TrendingDown, DollarSign,
  AlertTriangle, Receipt, BarChart2, Loader2,
} from "lucide-react";

interface Summary {
  actual_expenditure: number;
  estimated_expenditure: number;
  actual_revenue: number;
  total_debt: number;
  debt_ceiling: number;
  ceiling_breached: boolean;
  debt_expenditure: number;
  deficit: number;
}

const fmt = (n: number) => {
  if (n >= 1_000_000_000_000) return `Ksh ${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `Ksh ${(n / 1_000_000_000).toFixed(1)}B`;
  return `Ksh ${n.toLocaleString()}`;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/dashboard/summary")
      .then((r) => r.json())
      .then((data) => { setSummary(data); setLoading(false); })
      .catch(() => { setError("Could not reach API"); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", gap: "12px" }}>
      <Loader2 size={24} color="#10b981" style={{ animation: "spin 1s linear infinite" }} />
      <span style={{ color: "#64748b" }}>Loading live data...</span>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", margin: 0 }}>
            Dashboard
          </h1>
          <div style={{ padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "600" }}>FY 2023/2024</span>
          </div>
          {error && (
            <div style={{ padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <span style={{ fontSize: "11px", color: "#ef4444", fontWeight: "600" }}>{error} — showing cached data</span>
            </div>
          )}
          {!error && summary && (
            <div style={{ padding: "4px 10px", borderRadius: "20px", backgroundColor: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <span style={{ fontSize: "11px", color: "#3b82f6", fontWeight: "600" }}>● Live from DB</span>
            </div>
          )}
        </div>
        <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
          Kenya National Government · OAG Audit Report Overview
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <KPICard
          title="Actual Expenditure"
          value={summary ? fmt(summary.actual_expenditure) : "Ksh 4.23T"}
          subtitle={`vs ${summary ? fmt(summary.estimated_expenditure) : "Ksh 4.82T"} estimated`}
          change="12% under budget"
          changeType="negative"
          icon={TrendingDown}
          iconColor="#f59e0b"
          glowColor="rgba(245,158,11,0.1)"
        />
        <KPICard
          title="Actual Revenue"
          value={summary ? fmt(summary.actual_revenue) : "Ksh 2.29T"}
          subtitle={`vs ${summary ? fmt(summary.estimated_expenditure) : "Ksh 2.46T"} budgeted`}
          change="6.9% shortfall"
          changeType="negative"
          icon={DollarSign}
          iconColor="#ef4444"
          glowColor="rgba(239,68,68,0.1)"
        />
        <KPICard
          title="Public Debt"
          value={summary ? fmt(summary.total_debt) : "Ksh 10.58T"}
          subtitle={`Ceiling: ${summary ? fmt(summary.debt_ceiling) : "Ksh 10T"}`}
          change={summary?.ceiling_breached ? "Ceiling breached" : "Within ceiling"}
          changeType="negative"
          icon={AlertTriangle}
          iconColor="#ef4444"
          glowColor="rgba(239,68,68,0.1)"
        />
        <KPICard
          title="Deficit"
          value={summary ? fmt(summary.deficit) : "Ksh 1.59T"}
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
          value={summary ? fmt(summary.debt_expenditure) : "Ksh 1.598T"}
          subtitle="Debt servicing cost"
          change="↑ 33% from 2022/23"
          changeType="negative"
          icon={TrendingUp}
          iconColor="#ef4444"
          glowColor="rgba(239,68,68,0.1)"
        />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <BudgetTrendChart />
        <DebtGrowthChart />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <RevenueShortfallChart />
      </div>

      {/* Alert */}
      <div style={{ padding: "16px 20px", borderRadius: "12px", backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", gap: "12px" }}>
        <AlertTriangle size={18} color="#ef4444" />
        <div>
          <p style={{ color: "#ef4444", fontSize: "13px", fontWeight: "600", margin: 0 }}>
            Critical: Public debt of {summary ? fmt(summary.total_debt) : "Ksh 10.58T"} exceeds the Ksh 10T parliamentary ceiling
          </p>
          <p style={{ color: "#64748b", fontSize: "12px", margin: "2px 0 0 0" }}>
            Legal Notice No.89 of 26 May, 2022 · {summary ? fmt(summary.deficit) : "Ksh 1.59T"} deficit funded through domestic and foreign borrowing
          </p>
        </div>
      </div>
    </div>
  );
}
