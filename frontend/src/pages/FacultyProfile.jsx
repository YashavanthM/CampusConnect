import React, { useState } from "react";
import "./FacultyProfile.css";

export default function FacultyProfile({ faculty, goBack }) {
  const [details, setDetails] = useState({
    name: faculty?.name || "",
    dept: faculty?.dept || "",
    email: faculty?.email || "",
    phone: faculty?.phone || "",
    subjects: faculty?.subjects || "",
    cabin: faculty?.cabin || "",
    office_hours: faculty?.office_hours || ""
  });

  function handleChange(e) {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  async function saveProfile() {
    const res = await fetch("http://127.0.0.1:8000/faculty/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    });

    const data = await res.json();
    alert("Profile updated");
  }

  return (
    <div className="faculty-profile-container">
      <button className="back-btn" onClick={goBack}>⬅ Back</button>

      <h2>👨‍🏫 Edit Profile</h2>

      {Object.keys(details).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={details[key]}
          onChange={handleChange}
        />
      ))}

      <button onClick={saveProfile}>Save</button>
    </div>
  );
}
