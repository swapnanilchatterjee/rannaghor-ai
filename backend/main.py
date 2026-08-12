import os
import json
from typing import Dict, Any, Optional
from fastapi import FastAPI, Request, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from rag_engine import RecipeRAGEngine

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Rannaghor AI Backend",
    description="Python FastAPI + LangChain + ChromaDB RAG API Engine for Bengali Recipes",
    version="2.0.0"
)

# Enable CORS for React frontend (Vite dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Engine
rag_engine = RecipeRAGEngine()

@app.get("/")
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "Rannaghor AI Python FastAPI Backend",
        "architecture": "FastAPI + LangChain + ChromaDB RAG + Groq Llama 3",
        "recipes_indexed": len(rag_engine.recipes),
        "vector_store_active": rag_engine.vector_store is not None
    }

def extract_api_key(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if authorization and authorization.startswith("Bearer "):
        return authorization.replace("Bearer ", "").strip()
    return os.environ.get("GROQ_API_KEY", "")

@app.post("/api/suggest")
async def suggest_recipes(request: Request, authorization: Optional[str] = Header(None)):
    """
    RAG-driven recipe suggestion endpoint.
    Retrieves matching recipe context via Vector Search and generates structured JSON recipes.
    """
    try:
        body = await request.json()
    except Exception:
        body = {}

    api_key = extract_api_key(authorization)
    recipes = rag_engine.generate_recipes(body, api_key=api_key)

    # Return OpenAI / Groq compatible payload structure expected by front-end
    content_json = json.dumps({"recipes": recipes}, ensure_ascii=False)
    return {
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": content_json
                }
            }
        ]
    }

@app.post("/api/chat")
async def culinary_chat(request: Request, authorization: Optional[str] = Header(None)):
    """
    RAG-driven culinary chat assistant endpoint.
    Answers user cooking questions using vector database knowledge retrieval.
    """
    try:
        body = await request.json()
    except Exception:
        body = {}

    messages = body.get("messages", [])
    api_key = extract_api_key(authorization)

    reply_text = rag_engine.chat_response(messages, api_key=api_key)

    return {
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": reply_text
                }
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", 8000))
    print(f"[FastAPI] Starting Rannaghor AI Python RAG server on http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)
