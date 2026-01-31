
from google import genai
from app.core.config import settings
import asyncio

async def list_models():
    client = genai.Client(api_key=settings.GOOGLE_API_KEY)
    print("Fetching available models...")
    try:
        pager = client.models.list()
        
        print(f"{'Model Name':<50}")
        print("-" * 50)
        
        for model in pager:
            # Simply print the name for now to identify the correct slug
            if "gemini" in model.name:
                 print(f"{model.name:<50}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(list_models())
