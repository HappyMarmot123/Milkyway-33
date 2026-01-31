
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import chat

app = FastAPI(title="Milkyway-33 Backend")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3333",
        "http://127.0.0.1:3333",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to Milkyway-33 Backend", "docs": "/docs"}
