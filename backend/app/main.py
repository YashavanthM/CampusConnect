import os
from dotenv import load_dotenv

# Load backend/.env
BASE_DIR = os.path.dirname(os.path.dirname(__file__))   # backend/
ENV_PATH = os.path.join(BASE_DIR, ".env")
load_dotenv(ENV_PATH)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✔ Create FastAPI App HERE
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers import (after dotenv)
from app.api import chat, rag_api

# Include Routers
app.include_router(chat.router, prefix="/chat", tags=["Chatbot"])
app.include_router(rag_api.router, prefix="/rag", tags=["RAG"])
