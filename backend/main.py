from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="Uwazi Analytics API",
    description="Kenya Public Finance Intelligence Platform",
    version="1.0.0"
)

# CORS - allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:80"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================
# ROUTERS (we add these as we build each module)
# =============================================
# from routers import upload, dashboard, forecast
# from routers import audit_opinions, risk_scores
# from routers import pending_bills, civic, chat

@app.get("/")
def root():
    return {
        "platform": "Uwazi Analytics",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
