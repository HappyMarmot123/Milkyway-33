
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatRequest
from app.services.gemini import gemini_service

router = APIRouter()

@router.post("/chat") # Server-Sent Events (SSE)
async def chat_stream(request: ChatRequest):
    return StreamingResponse(
        gemini_service.generate_response_stream(
            message=request.message,
            system_instruction=request.system_instruction,
            few_shot_examples=request.few_shot_examples
        ),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
