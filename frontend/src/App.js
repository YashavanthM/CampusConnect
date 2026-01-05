import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./components/Chatbot";   // FIXED IMPORT
import Notes from "./pages/Notes";
import Faculty from "./pages/Faculty";
import Announcements from "./pages/Announcements";
import Profile from "./pages/Profile";



function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && (
        <Login onLogin={() => setPage("dashboard")} />
      )}
      {page === "announcements" && (
  <Announcements goBack={() => setPage("dashboard")} />
)}
{page === "profile" && (
  <Profile 
    goBack={() => setPage("dashboard")} 
    logout={() => setPage("login")}
  />
)}



      {page === "dashboard" && (
        <Dashboard
          openNotes={() => setPage("notes")}
           openAnnouncements={() => setPage("announcements")}
          openChat={() => setPage("chat")}
          openFaculty={() => setPage("faculty")}
           openProfile={() => setPage("profile")}   
        />
      )}

     {page === "chat" && <Chatbot goBack={() => setPage("dashboard")} />}


      {page === "notes" && <Notes goBack={() => setPage("dashboard")} />}
      {page === "faculty" && <Faculty goBack={() => setPage("dashboard")} />}
    </>
  );
}

export default App;
