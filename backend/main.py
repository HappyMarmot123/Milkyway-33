
from fastapi import FastAPI
from app.api.endpoints import chat

app = FastAPI(title="Milkyway-33 Backend")

app.include_router(chat.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to Milkyway-33 Backend", "docs": "/docs"}
