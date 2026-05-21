from fastapi import APIRouter, Depends, UploadFile, File, Form, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import text
from models.database import get_db
from services.pdf_extractor import extract_text_from_pdf, get_pdf_metadata
from services.claude_extractor import extract_with_retry
from services.data_normalizer import store_extracted_data
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


def process_report_background(
    report_id: str,
    file_path: str,
    db_url: str
):
    """
    Background task: extract PDF text → Claude extraction → store in DB.
    """
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker

    engine = create_engine(db_url)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()

    try:
        # Update status to extracting
        db.execute(text("""
            UPDATE reports SET extraction_status = 'extracting' WHERE id = :id
        """), {"id": report_id})
        db.commit()

        # Step 1: Extract text from PDF
        print(f"[{report_id}] Extracting text from PDF...")
        report_text = extract_text_from_pdf(file_path)
        print(f"[{report_id}] Extracted {len(report_text)} characters")

        # Update status to processing
        db.execute(text("""
            UPDATE reports SET extraction_status = 'processing' WHERE id = :id
        """), {"id": report_id})
        db.commit()

        # Step 2: Claude extraction
        print(f"[{report_id}] Running Claude extraction...")
        extracted = extract_with_retry(report_text)
        print(f"[{report_id}] Extraction complete")

        # Step 3: Store in database
        print(f"[{report_id}] Storing extracted data...")
        stored = store_extracted_data(db, report_id, extracted)
        print(f"[{report_id}] Stored: {stored}")

        # Update status to complete
        db.execute(text("""
            UPDATE reports 
            SET extraction_status = 'complete', extracted = true
            WHERE id = :id
        """), {"id": report_id})
        db.commit()
        print(f"[{report_id}] Processing complete!")

    except Exception as e:
        print(f"[{report_id}] ERROR: {e}")
        db.execute(text("""
            UPDATE reports 
            SET extraction_status = 'error'
            WHERE id = :id
        """), {"id": report_id})
        db.commit()
    finally:
        db.close()


@router.post("/upload")
async def upload_report(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    title: str = Form(...),
    year: int = Form(...),
    db: Session = Depends(get_db)
):
    # Validate file type
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are supported"}

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
    report_id = str(result.fetchone()[0])

    # Trigger background processing
    db_url = os.getenv("DATABASE_URL")
    background_tasks.add_task(
        process_report_background,
        report_id,
        file_path,
        db_url
    )

    return {
        "message": "Report uploaded. Processing started in background.",
        "report_id": report_id,
        "status": "pending",
        "file_name": file.filename,
    }


@router.get("/{report_id}/status")
def get_report_status(report_id: str, db: Session = Depends(get_db)):
    result = db.execute(text("""
        SELECT id, title, year, extracted, extraction_status, uploaded_at
        FROM reports WHERE id = :id
    """), {"id": report_id})
    row = result.fetchone()
    if not row:
        return {"error": "Report not found"}
    return dict(row._mapping)
