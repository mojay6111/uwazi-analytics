from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from models.database import get_db

router = APIRouter(prefix="/audit-opinions", tags=["audit-opinions"])

@router.get("/")
def get_audit_opinions(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT
            ao.entity_type,
            ao.unmodified,
            ao.qualified,
            ao.adverse,
            ao.disclaimer,
            ao.total,
            r.financial_year
        FROM audit_opinions ao
        JOIN reports r ON ao.report_id = r.id
        ORDER BY ao.total DESC
    """))
    rows = result.fetchall()
    return [dict(row._mapping) for row in rows]

@router.get("/summary")
def get_opinions_summary(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT
            SUM(unmodified) as total_unmodified,
            SUM(qualified) as total_qualified,
            SUM(adverse) as total_adverse,
            SUM(disclaimer) as total_disclaimer,
            SUM(total) as grand_total
        FROM audit_opinions
    """))
    row = result.fetchone()
    return dict(row._mapping)
