import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
ENV_PATH = os.path.join(BASE_DIR, ".env")
load_dotenv(ENV_PATH)

import google.generativeai as genai

API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in .env")

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

chat_history = []

def format_history():
    if not chat_history:
        return "No previous conversation."
    return "\n".join([f"{sender}: {msg}" for sender, msg in chat_history])


def ask_ai(user_input: str) -> str:
    try:
        full_prompt = f"""
You are CampusConnect AI for PESCE Mandya.

Here is the conversation history:
{format_history()}

User: {user_input}
Respond helpfully and clearly.
"""
        response = model.generate_content(full_prompt)
        reply = response.text.strip()

        chat_history.append(("User", user_input))
        chat_history.append(("AI", reply))

        return reply

    except Exception as e:
        return f"AI Error: {str(e)}"


# -----------------------------
# RAG ANSWERING FUNCTION
# -----------------------------
def generate_answer_with_context(question: str, passages: list) -> str:
    """
    Create an answer using retrieved text chunks + Gemini AI.
    """
    try:
        context_text = "\n\n".join(passages) if passages else "No relevant context found."

        prompt = f"""
You are CampusConnect AI for PESCE Mandya.
Use the following study material to answer the question.

Context:
{context_text}

Question:
{question}

Give a clear academic answer.
"""

        response = model.generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        return f"AI Error (RAG): {str(e)}"
