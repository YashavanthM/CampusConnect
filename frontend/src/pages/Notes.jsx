import React, { useState } from "react";
import "./Notes.css";

export default function Notes({ goBack }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Upload PDF to backend
  const uploadPDF = async () => {
    if (!file || !title.trim()) {
      alert("Please select a PDF file and enter a title.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const res = await fetch("http://127.0.0.1:8000/rag/upload_note", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // Backend returns only: { status: "success", message: "document saved." }
      alert(`Uploaded: ${data.status} - ${data.message}`);
    } catch (e) {
      alert("Upload error: " + e.message);
    }
  };

  // Ask AI using RAG
  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://127.0.0.1:8000/rag/ask_with_rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),   // Correct JSON body
      });

      const data = await res.json();
      setAnswer(data.answer || "No answer received.");
    } catch (e) {
      setAnswer("Error: " + e.message);
    }

    setLoading(false);
  };

  return (
    <div className="notes-container">

      {/* Back Btn */}
      <button className="back-btn" onClick={goBack}>⬅ Back to Dashboard</button>

      <h2>📘 Notes & RAG Search</h2>

      {/* Upload Section */}
      <div className="upload-box">
        <h3>📤 Upload PDF Notes</h3>

        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={uploadPDF}>Upload</button>
      </div>

      {/* RAG Query Section */}
      <div className="rag-box">
        <h3>🔍 Ask AI From Your Notes</h3>

        <input
          type="text"
          placeholder="Ask something based on uploaded notes..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI()}
        />

        <button onClick={askAI}>Search Notes</button>

        {loading && <p className="loading">AI is reading your notes... ⏳</p>}

        {answer && (
          <div className="answer-box">
            <h4>AI Answer:</h4>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
