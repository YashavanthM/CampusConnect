import React, { useState } from "react";
import "./Announcements.css";

export default function Announcements({ goBack }) {
  const [isExiting, setIsExiting] = useState(false);

  const announcements = [
    {
      title: "Internal Test 1 Timetable Released",
      date: "05 Dec 2025",
      type: "normal",
      details: "Timetable for IT-1 is now available for all departments.",
    },
    {
      title: "Workshop on AI & ML",
      date: "10 Dec 2025",
      type: "normal",
      details: "Hands-on workshop in MCA seminar hall.",
    },
    {
      title: "Holiday on Friday",
      date: "15 Dec 2025",
      type: "holiday",
      details: "College will remain closed due to a national event.",
    },
    {
      title: "📘 Python Full Course",
      date: "Anytime",
      type: "course",
      details: (
        <>
          Beginner to advanced Python.
          <br />
          <a
            href="https://www.youtube.com/watch?v=gfDE2a7MKjA"
            target="_blank"
            rel="noopener noreferrer"
            className="yt-link"
          >
            ▶ Watch Course
          </a>
        </>
      ),
    },
    {
      title: "⚛️ React.js Full Course",
      date: "Web Development",
      type: "course",
      details: (
        <>
          Build professional frontend apps.
          <br />
          <a
            href="https://www.youtube.com/watch?v=RVFAyFWO4go"
            target="_blank"
            rel="noopener noreferrer"
            className="yt-link"
          >
            ▶ Learn React
          </a>
        </>
      ),
    },
  ];

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(goBack, 350);
  };

  return (
    <div className={`ann-container ${isExiting ? "ann-exit" : ""}`}>
      
      {/* Header */}
      <div className="ann-header">
        <button className="back-btn" onClick={handleBack}>
          ⬅ Back
        </button>
        <h2 className="ann-title">Announcements</h2>
      </div>

      {/* Content */}
      <div className="ann-content">
        <div className="ann-grid">
          {announcements.map((item, index) => (
            <div
              className={`ann-card ${item.type}`}
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3>{item.title}</h3>
              <p className="date">{item.date}</p>
              <p>{item.details}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
