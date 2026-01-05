import React, { useState } from "react";
import "./Chatbot.css";

export default function Chatbot({ goBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    // Add user bubble
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "AI Error: No response." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Server Error: Unable to connect to AI backend.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="chat-container">
      <button className="back-btn" onClick={goBack}>⬅ Back to Dashboard</button>

      <h2>🤖 AI Chatbot</h2>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {loading && <div className="bubble bot">Typing...</div>}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
