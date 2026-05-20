from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routers import dashboard, audit_opinions, upload
import os

load_dotenv()

app = FastAPI(
    title="Uwazi Analytics API",
    description="Kenya Public Finance Intelligence Platform",
    version="1.0.0"
)

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

# Routers
app.include_router(dashboard.router)
app.include_router(audit_opinions.router)
app.include_router(upload.router)

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
