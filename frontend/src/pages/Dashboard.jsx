import React from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard({ 
  openNotes = () => {}, 
  openAnnouncements = () => {}, 
  openChat = () => {}, 
  openFaculty = () => {},
  openProfile = () => {}
}) {

  // Animation variants for a smooth entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="dashboard-layout">
      
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="brand">
          <span>⚡</span> CampusConnect
        </div>
        
        <nav>
          {/* We use a fake 'active' class on Dashboard to make it look selected */}
          <div className="nav-item active">🏠 Dashboard</div>
          <div className="nav-item" onClick={openNotes}>📘 Notes</div>
          <div className="nav-item" onClick={openAnnouncements}>📢 News</div>
          <div className="nav-item" onClick={openChat}>🤖 AI Assistant</div>
          <div className="nav-item" onClick={openFaculty}>👨‍🏫 Faculty</div>
          <div className="nav-item" onClick={openProfile}>⚙️ Settings</div>
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="main-content">
        
        <header className="header-welcome">
          <h1>Hello, Student <span>👋</span></h1>
          <p>Here is what's happening on campus today.</p>
        </header>

        {/* THE CARD GRID */}
        <motion.div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* 1. ACADEMIC NOTES */}
          <motion.div 
            className="bento-card card-notes" 
            onClick={openNotes}
            variants={itemVariants}
          >
            <div className="card-icon-box">📘</div>
            <div>
              <h3>Academic Notes</h3>
              <p>Access PDFs, study materials, and lecture slides.</p>
            </div>
          </motion.div>

          {/* 2. ANNOUNCEMENTS */}
          <motion.div 
            className="bento-card card-announcements" 
            onClick={openAnnouncements}
            variants={itemVariants}
          >
            <div className="card-icon-box">📢</div>
            <div>
              <h3>Announcements</h3>
              <p>Check circulars, exam schedules, and events.</p>
            </div>
          </motion.div>

          {/* 3. AI STUDY ASSISTANT (Featured Purple Card) */}
          <motion.div 
            className="bento-card card-ai" 
            onClick={openChat}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }} // Subtle extra pop for the feature card
          >
            <div className="card-icon-box">✨</div>
            <div>
              <h3>AI Study Assistant</h3>
              <p>Ask Gemini 2.5 Flash anything about your syllabus.</p>
            </div>
          </motion.div>

          {/* 4. FACULTY DETAILS */}
          <motion.div 
            className="bento-card card-faculty" 
            onClick={openFaculty}
            variants={itemVariants}
          >
            <div className="card-icon-box">👨‍🏫</div>
            <div>
              <h3>Faculty Details</h3>
              <p>Find contact info for HODs and professors.</p>
            </div>
          </motion.div>

          {/* 5. MY PROFILE */}
          <motion.div 
            className="bento-card card-profile" 
            onClick={openProfile}
            variants={itemVariants}
          >
            <div className="card-icon-box">⚙️</div>
            <div>
              <h3>My Profile</h3>
              <p>Update your details and app settings.</p>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}