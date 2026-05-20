from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import text
from models.database import get_db
from typing import Optional

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/budget")
def get_budget_figures(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT 
            bf.financial_year,
            bf.estimated_expenditure,
            bf.actual_expenditure,
            bf.under_expenditure,
            bf.under_expenditure_pct,
            bf.recurrent_spending,
            bf.development_spending,
            bf.consolidated_fund_services
        FROM budget_figures bf
        JOIN reports r ON bf.report_id = r.id
        ORDER BY bf.financial_year ASC
    """))
    rows = result.fetchall()
    return [dict(row._mapping) for row in rows]

@router.get("/revenue")
def get_revenue_figures(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT
            financial_year,
            budgeted_revenue,
            actual_revenue,
            surplus_shortfall,
            surplus_shortfall_pct
        FROM revenue_figures
        ORDER BY financial_year ASC
    """))
    rows = result.fetchall()
    return [dict(row._mapping) for row in rows]

@router.get("/debt")
def get_debt_figures(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT
            financial_year,
            total_debt,
            debt_ceiling,
            ceiling_breached,
            cbk_overdraft,
            commitment_fees,
            debt_expenditure
        FROM debt_figures
        ORDER BY financial_year ASC
    """))
    rows = result.fetchall()
    return [dict(row._mapping) for row in rows]

@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT
            (SELECT actual_expenditure FROM budget_figures ORDER BY financial_year DESC LIMIT 1) as actual_expenditure,
            (SELECT estimated_expenditure FROM budget_figures ORDER BY financial_year DESC LIMIT 1) as estimated_expenditure,
            (SELECT actual_revenue FROM revenue_figures ORDER BY financial_year DESC LIMIT 1) as actual_revenue,
            (SELECT total_debt FROM debt_figures ORDER BY financial_year DESC LIMIT 1) as total_debt,
            (SELECT debt_ceiling FROM debt_figures ORDER BY financial_year DESC LIMIT 1) as debt_ceiling,
            (SELECT ceiling_breached FROM debt_figures ORDER BY financial_year DESC LIMIT 1) as ceiling_breached,
            (SELECT debt_expenditure FROM debt_figures ORDER BY financial_year DESC LIMIT 1) as debt_expenditure
    """))
    row = result.fetchone()
    data = dict(row._mapping)
    data["deficit"] = float(data["actual_expenditure"] or 0) - float(data["actual_revenue"] or 0)
    return data
