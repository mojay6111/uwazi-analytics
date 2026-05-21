import fitz  # PyMuPDF
import os
from typing import Optional

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract all text from a PDF file using PyMuPDF.
    Returns concatenated text from all pages.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF not found: {file_path}")

    doc = fitz.open(file_path)
    full_text = []

    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text("text")
        if text.strip():
            full_text.append(f"--- PAGE {page_num + 1} ---\n{text}")

    doc.close()
    return "\n\n".join(full_text)


def extract_text_by_sections(file_path: str) -> dict:
    """
    Extract text page by page, returning a dict of page_num: text
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF not found: {file_path}")

    doc = fitz.open(file_path)
    pages = {}

    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text("text").strip()
        if text:
            pages[page_num + 1] = text

    doc.close()
    return pages


def get_pdf_metadata(file_path: str) -> dict:
    """
    Get basic metadata about the PDF.
    """
    doc = fitz.open(file_path)
    metadata = {
        "page_count": len(doc),
        "title": doc.metadata.get("title", ""),
        "author": doc.metadata.get("author", ""),
        "file_size_mb": round(os.path.getsize(file_path) / (1024 * 1024), 2),
    }
    doc.close()
    return metadata
