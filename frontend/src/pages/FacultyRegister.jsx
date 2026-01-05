import React, { useState } from "react";
import "./FacultyRegister.css";

export default function FacultyRegister({ goBack }) {
  const [details, setDetails] = useState({
    name: "",
    dept: "",
    email: "",
    phone: "",
    subject: "",
  });

  function handleChange(e) {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  function saveFaculty() {
    let list = JSON.parse(localStorage.getItem("facultyList") || "[]");
    list.push(details);

    localStorage.setItem("facultyList", JSON.stringify(list));
    alert("Faculty details saved!");
    goBack();
  }

  return (
    <div className="faculty-register-container">
      <button className="back-btn" onClick={goBack}>⬅ Back</button>
      <h2>👨‍🏫 Faculty Registration</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="dept" placeholder="Department (CSE / ISE / ECE...)" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone number" onChange={handleChange} />
      <input name="subject" placeholder="Subject" onChange={handleChange} />

      <button onClick={saveFaculty}>Save</button>
    </div>
  );
}
