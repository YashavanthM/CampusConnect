from fastapi import APIRouter
from pydantic import BaseModel
from app.core.llm_client import ask_ai

router = APIRouter()

class Message(BaseModel):
    message: str

@router.post("/")
def chat(msg: Message):
    reply = ask_ai(msg.message)
    return {"reply": reply}
