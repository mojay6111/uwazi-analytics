from pydantic import BaseModel, UUID4
from typing import Optional, List
from datetime import datetime

# =============================================
# REPORT SCHEMAS
# =============================================
class ReportBase(BaseModel):
    title: str
    year: int
    report_type: Optional[str] = "national_government"

class ReportCreate(ReportBase):
    file_name: Optional[str] = None
    file_path: Optional[str] = None

class ReportResponse(ReportBase):
    id: UUID4
    extracted: bool
    extraction_status: str
    uploaded_at: datetime

    class Config:
        from_attributes = True

# =============================================
# BUDGET SCHEMAS
# =============================================
class BudgetFigureResponse(BaseModel):
    id: UUID4
    financial_year: str
    estimated_expenditure: Optional[float]
    actual_expenditure: Optional[float]
    under_expenditure: Optional[float]
    under_expenditure_pct: Optional[float]
    recurrent_spending: Optional[float]
    development_spending: Optional[float]
    consolidated_fund_services: Optional[float]

    class Config:
        from_attributes = True

# =============================================
# REVENUE SCHEMAS
# =============================================
class RevenueFigureResponse(BaseModel):
    id: UUID4
    financial_year: str
    budgeted_revenue: Optional[float]
    actual_revenue: Optional[float]
    surplus_shortfall: Optional[float]
    surplus_shortfall_pct: Optional[float]

    class Config:
        from_attributes = True

# =============================================
# DEBT SCHEMAS
# =============================================
class DebtFigureResponse(BaseModel):
    id: UUID4
    financial_year: str
    total_debt: Optional[float]
    debt_ceiling: Optional[float]
    ceiling_breached: Optional[bool]
    cbk_overdraft: Optional[float]
    commitment_fees: Optional[float]
    debt_expenditure: Optional[float]

    class Config:
        from_attributes = True

# =============================================
# AUDIT OPINION SCHEMAS
# =============================================
class AuditOpinionResponse(BaseModel):
    id: UUID4
    entity_type: str
    unmodified: int
    qualified: int
    adverse: int
    disclaimer: int
    total: int

    class Config:
        from_attributes = True

# =============================================
# MDA SCHEMAS
# =============================================
class MDAResponse(BaseModel):
    id: UUID4
    name: str
    short_name: Optional[str]
    category: Optional[str]
    parent_ministry: Optional[str]

    class Config:
        from_attributes = True

# =============================================
# RISK SCORE SCHEMAS
# =============================================
class RiskScoreResponse(BaseModel):
    id: UUID4
    mda_id: UUID4
    total_score: Optional[float]
    opinion_score: Optional[float]
    pending_bills_score: Optional[float]
    unsupported_expenditure_score: Optional[float]
    ifmis_score: Optional[float]
    risk_level: Optional[str]

    class Config:
        from_attributes = True

# =============================================
# PENDING BILLS SCHEMAS
# =============================================
class PendingBillResponse(BaseModel):
    id: UUID4
    mda_id: UUID4
    amount: Optional[float]
    category: Optional[str]
    bill_type: Optional[str]
    financial_year: Optional[str]

    class Config:
        from_attributes = True

# =============================================
# CHAT SCHEMAS
# =============================================
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    report_id: Optional[UUID4] = None
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = []
