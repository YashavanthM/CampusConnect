import React, { useEffect, useState } from "react";
import "./Faculty.css";

export default function Faculty({ goBack }) {
  const defaultFaculty = [
    { name: "Dr. Ramesh M", dept: "CSE", email: "ramesh@pesce.ac.in", phone: "9876543210" },
    { name: "Dr. Kavitha S", dept: "ISE", email: "kavitha@pesce.ac.in", phone: "9876543211" },
    { name: "Prof. Gopal R", dept: "ECE", email: "gopal@pesce.ac.in", phone: "9876543212" },
    { name: "Prof. Manjunath K", dept: "EEE", email: "manjunath@pesce.ac.in", phone: "9876543213" },
    { name: "Dr. Shashikala B", dept: "MECH", email: "shashikala@pesce.ac.in", phone: "9876543214" },
  ];

  const [facultyList, setFacultyList] = useState(defaultFaculty);

  // Load faculty added by faculty members (from localStorage)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("facultyList") || "[]");
    if (saved.length > 0) {
      setFacultyList([...defaultFaculty, ...saved]);
    }
  }, []);

  return (
    <div className="faculty-container">

      <button className="back-btn" onClick={goBack}>⬅ Back</button>

      <h2 className="title">👨‍🏫 Faculty Directory</h2>

      <div className="faculty-grid">
        {facultyList.map((faculty, index) => (
          <div className="faculty-card" key={index}>
            <h3>{faculty.name}</h3>
            <p><strong>Department:</strong> {faculty.dept}</p>
            <p><strong>Email:</strong> {faculty.email}</p>
            <p><strong>Phone:</strong> {faculty.phone}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
