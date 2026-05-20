from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import text
from models.database import get_db
import os
import shutil
import uuid

router = APIRouter(prefix="/reports", tags=["reports"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/")
def get_reports(db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT id, title, year, report_type, extracted,
               extraction_status, uploaded_at
        FROM reports
        ORDER BY year DESC
    """))
    rows = result.fetchall()
    return [dict(row._mapping) for row in rows]

@router.post("/upload")
async def upload_report(
    file: UploadFile = File(...),
    title: str = Form(...),
    year: int = Form(...),
    db: Session = Depends(get_db)
):
    # Save file
    file_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Insert report record
    result = db.execute(text("""
        INSERT INTO reports (title, year, report_type, file_path, file_name, extracted, extraction_status)
        VALUES (:title, :year, 'national_government', :file_path, :file_name, false, 'pending')
        RETURNING id
    """), {
        "title": title,
        "year": year,
        "file_path": file_path,
        "file_name": file.filename,
    })
    db.commit()
    report_id = result.fetchone()[0]

    return {
        "message": "Report uploaded successfully",
        "report_id": str(report_id),
        "status": "pending",
        "next": "extraction"
    }
