import React, { useState } from "react";
import "./Profile.css";

export default function Profile({ goBack, logout }) {

  const [profile, setProfile] = useState({
    name: "Yashavanth",
    usn: "PESCE1234",
    dept: "Information Science",
    email: "yash@pesce.ac.in",
  });

  return (
    <div className="profile-container">

      <button className="back-btn" onClick={goBack}>⬅ Back</button>

      <h2 className="title">👤 Profile & Settings</h2>

      <div className="profile-card">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>USN:</strong> {profile.usn}</p>
        <p><strong>Department:</strong> {profile.dept}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>

      <div className="actions">
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

    </div>
  );
}
