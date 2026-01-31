
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatRequest
from app.services.gemini import gemini_service

router = APIRouter()

@router.post("/chat") # Server-Sent Events (SSE)
async def chat_stream(request: ChatRequest):
    return StreamingResponse(
        gemini_service.generate_response_stream(request.message),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
