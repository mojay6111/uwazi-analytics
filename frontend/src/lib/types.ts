// =============================================
// SHARED TYPES - mirrors backend schemas
// =============================================

export interface Report {
  id: string;
  title: string;
  year: number;
  report_type: string;
  extracted: boolean;
  extraction_status: string;
  uploaded_at: string;
}

export interface BudgetFigure {
  id: string;
  financial_year: string;
  estimated_expenditure: number;
  actual_expenditure: number;
  under_expenditure: number;
  under_expenditure_pct: number;
  recurrent_spending: number;
  development_spending: number;
  consolidated_fund_services: number;
}

export interface RevenueFigure {
  id: string;
  financial_year: string;
  budgeted_revenue: number;
  actual_revenue: number;
  surplus_shortfall: number;
  surplus_shortfall_pct: number;
}

export interface DebtFigure {
  id: string;
  financial_year: string;
  total_debt: number;
  debt_ceiling: number;
  ceiling_breached: boolean;
  cbk_overdraft: number;
  commitment_fees: number;
  debt_expenditure: number;
}

export interface AuditOpinion {
  id: string;
  entity_type: string;
  unmodified: number;
  qualified: number;
  adverse: number;
  disclaimer: number;
  total: number;
}

export interface MDA {
  id: string;
  name: string;
  short_name: string;
  category: string;
  parent_ministry: string;
}

export interface RiskScore {
  id: string;
  mda_id: string;
  total_score: number;
  opinion_score: number;
  pending_bills_score: number;
  unsupported_expenditure_score: number;
  ifmis_score: number;
  risk_level: string;
}

export interface PendingBill {
  id: string;
  mda_id: string;
  amount: number;
  category: string;
  bill_type: string;
  financial_year: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
