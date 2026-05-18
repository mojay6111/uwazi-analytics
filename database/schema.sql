-- =============================================
-- UWAZI ANALYTICS - DATABASE SCHEMA
-- =============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. REPORTS
-- Stores every uploaded OAG report
-- =============================================
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    report_type VARCHAR(100) DEFAULT 'national_government',
    file_path TEXT,
    file_name VARCHAR(255),
    extracted BOOLEAN DEFAULT FALSE,
    extraction_status VARCHAR(50) DEFAULT 'pending',
    uploaded_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 2. BUDGET FIGURES
-- Estimated vs actual expenditure per year
-- =============================================
CREATE TABLE IF NOT EXISTS budget_figures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    financial_year VARCHAR(20) NOT NULL,
    estimated_expenditure NUMERIC(20, 2),
    actual_expenditure NUMERIC(20, 2),
    under_expenditure NUMERIC(20, 2),
    under_expenditure_pct NUMERIC(5, 2),
    recurrent_spending NUMERIC(20, 2),
    development_spending NUMERIC(20, 2),
    consolidated_fund_services NUMERIC(20, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 3. REVENUE FIGURES
-- Budgeted vs actual ordinary revenue
-- =============================================
CREATE TABLE IF NOT EXISTS revenue_figures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    financial_year VARCHAR(20) NOT NULL,
    budgeted_revenue NUMERIC(20, 2),
    actual_revenue NUMERIC(20, 2),
    surplus_shortfall NUMERIC(20, 2),
    surplus_shortfall_pct NUMERIC(5, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 4. DEBT FIGURES
-- Public debt per financial year
-- =============================================
CREATE TABLE IF NOT EXISTS debt_figures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    financial_year VARCHAR(20) NOT NULL,
    total_debt NUMERIC(20, 2),
    debt_ceiling NUMERIC(20, 2),
    ceiling_breached BOOLEAN DEFAULT FALSE,
    cbk_overdraft NUMERIC(20, 2),
    commitment_fees NUMERIC(20, 2),
    debt_expenditure NUMERIC(20, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 5. AUDIT OPINIONS
-- Summary of opinion types per report
-- =============================================
CREATE TABLE IF NOT EXISTS audit_opinions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    entity_type VARCHAR(100) NOT NULL,
    unmodified INTEGER DEFAULT 0,
    qualified INTEGER DEFAULT 0,
    adverse INTEGER DEFAULT 0,
    disclaimer INTEGER DEFAULT 0,
    total INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 6. MDAs (Ministries, Departments & Agencies)
-- Master list of all government entities
-- =============================================
CREATE TABLE IF NOT EXISTS mdas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    short_name VARCHAR(100),
    category VARCHAR(100),
    parent_ministry VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 7. MDA FINDINGS
-- Specific audit findings per MDA per report
-- =============================================
CREATE TABLE IF NOT EXISTS mda_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    mda_id UUID REFERENCES mdas(id) ON DELETE CASCADE,
    finding_type VARCHAR(100),
    amount NUMERIC(20, 2),
    description TEXT,
    severity VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 8. PENDING BILLS
-- Outstanding payments per MDA per report
-- =============================================
CREATE TABLE IF NOT EXISTS pending_bills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    mda_id UUID REFERENCES mdas(id) ON DELETE CASCADE,
    amount NUMERIC(20, 2),
    category VARCHAR(100),
    bill_type VARCHAR(50) DEFAULT 'mda',
    financial_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 9. RISK SCORES
-- Computed risk score per MDA per report
-- =============================================
CREATE TABLE IF NOT EXISTS risk_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    mda_id UUID REFERENCES mdas(id) ON DELETE CASCADE,
    total_score NUMERIC(5, 2),
    opinion_score NUMERIC(5, 2),
    pending_bills_score NUMERIC(5, 2),
    unsupported_expenditure_score NUMERIC(5, 2),
    ifmis_score NUMERIC(5, 2),
    risk_level VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 10. RECOMMENDATIONS
-- Audit recommendations per report
-- =============================================
CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    category VARCHAR(100),
    target_entity VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 11. LOANS
-- Government loans to state enterprises
-- =============================================
CREATE TABLE IF NOT EXISTS loans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    entity_name VARCHAR(255),
    loan_amount NUMERIC(20, 2),
    guaranteed_debt NUMERIC(20, 2),
    status VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 12. EQUALISATION FUND
-- Tracking of fund releases to marginalized counties
-- =============================================
CREATE TABLE IF NOT EXISTS equalisation_fund (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    financial_year VARCHAR(20),
    total_entitlement NUMERIC(20, 2),
    amount_transferred NUMERIC(20, 2),
    shortfall NUMERIC(20, 2),
    counties_affected INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- INDEXES for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_budget_year ON budget_figures(financial_year);
CREATE INDEX IF NOT EXISTS idx_revenue_year ON revenue_figures(financial_year);
CREATE INDEX IF NOT EXISTS idx_debt_year ON debt_figures(financial_year);
CREATE INDEX IF NOT EXISTS idx_mda_findings_report ON mda_findings(report_id);
CREATE INDEX IF NOT EXISTS idx_mda_findings_mda ON mda_findings(mda_id);
CREATE INDEX IF NOT EXISTS idx_pending_bills_mda ON pending_bills(mda_id);
CREATE INDEX IF NOT EXISTS idx_risk_scores_mda ON risk_scores(mda_id);
CREATE INDEX IF NOT EXISTS idx_risk_scores_report ON risk_scores(report_id);

