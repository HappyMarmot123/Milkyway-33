### Frontend (Port: 3333) React + Vite
```bash
npm run dev
```

### Backend (Port: 8888) Python + FastAPI
```bash
cd backend
uv run uvicorn main:app --reload --port 8888
uv run python cli_chat.py

### Gemini 응답 데이터 종류
- thought: 모델의 사고 과정 (Gemini 2.5+ 모델)
- finish_reason: 응답 완료 이유 (STOP, MAX_TOKENS 등)
- safety_ratings: 안전성 평가 결과
- usage_metadata: 토큰 사용량 (프롬프트/응답/총합/생각)