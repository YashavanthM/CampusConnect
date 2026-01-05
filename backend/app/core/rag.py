import io
from typing import List
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings
from dotenv import load_dotenv
import os
from app.core.llm_client import generate_answer_with_context

load_dotenv()

# Embedding model
EMBED_MODEL_NAME = "all-MiniLM-L6-v2"
embed_model = SentenceTransformer(EMBED_MODEL_NAME)

# ChromaDB folder
CHROMA_DIR = os.getenv("CHROMA_DIR", "chroma_db")

client = chromadb.PersistentClient(path=CHROMA_DIR)

# Create or get collection
COLLECTION_NAME = "notes_collection"
collection = client.get_or_create_collection(
    COLLECTION_NAME,
    metadata={"hnsw:space": "cosine"}
)

# -------- PDF TO TEXT FIX -------- #
def pdf_to_text(file_bytes: bytes) -> str:
    """
    Convert PDF bytes → extracted text.
    FIXED: Wrapped inside BytesIO so PyPDF2 can read it.
    """
    pdf_stream = io.BytesIO(file_bytes)
    reader = PdfReader(pdf_stream)

    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""

    return text.strip()


# -------- ADD DOCUMENT TO VECTOR DB -------- #
def add_document(doc_id: str, title: str, content: str):
    embedding = embed_model.encode([content]).tolist()

    collection.add(
        ids=[doc_id],
        documents=[content],
        metadatas=[{"title": title}],
        embeddings=embedding
    )

    return {"status": "success", "message": "Document saved."}


# -------- SEARCH NOTES -------- #


def search_notes(query: str):
    # 1) Embed the query
    query_emb = embed_model.encode([query]).tolist()

    # 2) Search vector DB
    results = collection.query(
        query_embeddings=query_emb,
        n_results=3
    )

    if not results["documents"]:
        return "No relevant notes found."

    # Join top chunks
    context = "\n\n".join(results["documents"][0])

    # 3) LLM generates final answer
    final_answer = generate_answer_with_context(query, context)

    return final_answer
