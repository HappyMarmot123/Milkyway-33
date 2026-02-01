
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatRequest
from app.services.gemini import gemini_service

router = APIRouter()

from app.services.guardrail import guardrail_service

@router.post("/chat") # Server-Sent Events (SSE)
async def chat_stream(request: ChatRequest):
    
    await guardrail_service.check_injection(request.message)
    safe_message = guardrail_service.format_with_delimiters(request.message)

    return StreamingResponse(
        gemini_service.generate_response_stream(
            message=safe_message,
            system_instruction=request.system_instruction,
            few_shot_examples=request.few_shot_examples
        ),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
