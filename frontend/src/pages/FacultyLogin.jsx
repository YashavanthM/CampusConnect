import React, { useState } from "react";
import "./FacultyLogin.css";

export default function FacultyLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("http://127.0.0.1:8000/faculty/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.status === "success") {
      onLogin(data.faculty);
    } else {
      alert("Invalid login");
    }
  }

  return (
    <div className="faculty-login-container">
      <h2>👨‍🏫 Faculty Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
