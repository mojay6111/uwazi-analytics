from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import Optional
import uuid

def store_extracted_data(db: Session, report_id: str, extracted: dict) -> dict:
    """
    Store Claude-extracted data into all relevant database tables.
    Returns summary of what was stored.
    """
    stored = {
        "budget_figures": 0,
        "revenue_figures": 0,
        "debt_figures": 0,
        "audit_opinions": 0,
        "recommendations": 0,
        "errors": []
    }

    # 1. Budget figures
    for bf in extracted.get("budget_figures", []):
        try:
            db.execute(text("""
                INSERT INTO budget_figures (
                    report_id, financial_year, estimated_expenditure,
                    actual_expenditure, under_expenditure, under_expenditure_pct,
                    recurrent_spending, development_spending, consolidated_fund_services
                ) VALUES (
                    :report_id, :financial_year, :estimated_expenditure,
                    :actual_expenditure, :under_expenditure, :under_expenditure_pct,
                    :recurrent_spending, :development_spending, :consolidated_fund_services
                )
                ON CONFLICT DO NOTHING
            """), {
                "report_id": report_id,
                "financial_year": bf.get("financial_year"),
                "estimated_expenditure": bf.get("estimated_expenditure"),
                "actual_expenditure": bf.get("actual_expenditure"),
                "under_expenditure": bf.get("under_expenditure"),
                "under_expenditure_pct": bf.get("under_expenditure_pct"),
                "recurrent_spending": bf.get("recurrent_spending"),
                "development_spending": bf.get("development_spending"),
                "consolidated_fund_services": bf.get("consolidated_fund_services"),
            })
            stored["budget_figures"] += 1
        except Exception as e:
            stored["errors"].append(f"budget_figures: {str(e)}")

    # 2. Revenue figures
    for rf in extracted.get("revenue_figures", []):
        try:
            db.execute(text("""
                INSERT INTO revenue_figures (
                    report_id, financial_year, budgeted_revenue,
                    actual_revenue, surplus_shortfall, surplus_shortfall_pct
                ) VALUES (
                    :report_id, :financial_year, :budgeted_revenue,
                    :actual_revenue, :surplus_shortfall, :surplus_shortfall_pct
                )
                ON CONFLICT DO NOTHING
            """), {
                "report_id": report_id,
                "financial_year": rf.get("financial_year"),
                "budgeted_revenue": rf.get("budgeted_revenue"),
                "actual_revenue": rf.get("actual_revenue"),
                "surplus_shortfall": rf.get("surplus_shortfall"),
                "surplus_shortfall_pct": rf.get("surplus_shortfall_pct"),
            })
            stored["revenue_figures"] += 1
        except Exception as e:
            stored["errors"].append(f"revenue_figures: {str(e)}")

    # 3. Debt figures
    for df in extracted.get("debt_figures", []):
        try:
            db.execute(text("""
                INSERT INTO debt_figures (
                    report_id, financial_year, total_debt, debt_ceiling,
                    ceiling_breached, cbk_overdraft, commitment_fees, debt_expenditure
                ) VALUES (
                    :report_id, :financial_year, :total_debt, :debt_ceiling,
                    :ceiling_breached, :cbk_overdraft, :commitment_fees, :debt_expenditure
                )
                ON CONFLICT DO NOTHING
            """), {
                "report_id": report_id,
                "financial_year": df.get("financial_year"),
                "total_debt": df.get("total_debt"),
                "debt_ceiling": df.get("debt_ceiling"),
                "ceiling_breached": df.get("ceiling_breached"),
                "cbk_overdraft": df.get("cbk_overdraft"),
                "commitment_fees": df.get("commitment_fees"),
                "debt_expenditure": df.get("debt_expenditure"),
            })
            stored["debt_figures"] += 1
        except Exception as e:
            stored["errors"].append(f"debt_figures: {str(e)}")

    # 4. Audit opinions
    for ao in extracted.get("audit_opinions", []):
        try:
            db.execute(text("""
                INSERT INTO audit_opinions (
                    report_id, entity_type, unmodified,
                    qualified, adverse, disclaimer, total
                ) VALUES (
                    :report_id, :entity_type, :unmodified,
                    :qualified, :adverse, :disclaimer, :total
                )
                ON CONFLICT DO NOTHING
            """), {
                "report_id": report_id,
                "entity_type": ao.get("entity_type"),
                "unmodified": ao.get("unmodified", 0),
                "qualified": ao.get("qualified", 0),
                "adverse": ao.get("adverse", 0),
                "disclaimer": ao.get("disclaimer", 0),
                "total": ao.get("total", 0),
            })
            stored["audit_opinions"] += 1
        except Exception as e:
            stored["errors"].append(f"audit_opinions: {str(e)}")

    # 5. Recommendations
    for rec in extracted.get("recommendations", []):
        try:
            db.execute(text("""
                INSERT INTO recommendations (report_id, text, category)
                VALUES (:report_id, :text, :category)
            """), {
                "report_id": report_id,
                "text": rec.get("text"),
                "category": rec.get("category", "general"),
            })
            stored["recommendations"] += 1
        except Exception as e:
            stored["errors"].append(f"recommendations: {str(e)}")

    db.commit()
    return stored
