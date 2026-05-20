from fastapi import FastAPI

app = FastAPI(title="Uwazi ML Service", version="1.0.0")

@app.get("/")
def root():
    return {"service": "Uwazi ML", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}
