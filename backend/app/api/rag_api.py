from fastapi import APIRouter, UploadFile, File, Form
from app.core.rag import pdf_to_text, add_document, search_notes

router = APIRouter()


# -------- UPLOAD NOTE -------- #
@router.post("/upload_note")
async def upload_note(file: UploadFile = File(...), title: str = Form(...)):
    content_bytes = await file.read()

    text = pdf_to_text(content_bytes)

    result = add_document(
        doc_id=file.filename,
        title=title,
        content=text
    )
    return result


# -------- SEARCH NOTES -------- #
@router.post("/ask_with_rag")
async def ask_with_rag(payload: dict):
    query = payload.get("query", "")

    answer = search_notes(query)

    return {"answer": answer}
