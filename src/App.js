import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import firebase from "./firebase";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RenderWithoutTrackingyt from "./Pages/VideoPlayer/RenderWithoutTrackingyt";
import Notes from "./Pages/NotesPage/NotesPage"
import VideoPlayer from "./Pages/VideoPlayer/VideoPlayer";
import LandingPage from "./Pages/Dashboard/Landing"
import SearchPage from "./Pages/SearchPage/SearchPage"
import LandingHomePage from "./Pages/Home/LandingHomePage";
import { UserContext } from "./UserContext";

// Create an instance of the Firebase authentication service.
const auth = firebase.auth();

/**
 * The main component of the application.
 */
function App() {
  // Define a state variable for the user ID.
  const [uid, setUid] = useState("");
  // Create a context value for the user ID state.
  const value = { uid, setUid };

  return (
    // Provide the user ID context to the application.
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          {/* Define the different routes of the application */}
          <Route exact path="/" element={<LandingHomePage />} />
          <Route path={"/dashboard"} element={<Home />} />
          <Route path={"/video-player"} element={<VideoPlayer />} />
          <Route path={"/explore-video"} element={<RenderWithoutTrackingyt />} />
          <Route path={"/notes"} element={<Notes />} />
          <Route path={"/search"} element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

/**
 * The main content of the application, which is either the dashboard or the landing page.
 */
function Home() {
  // Determine if a user is logged in.
  const [userLoggedIn] = useAuthState(auth);

  // Render the appropriate content based on the user's login status.
  return (
    userLoggedIn ? <Dashboard /> : <LandingPage />
  );
}

// Export the main application component.
export default App;
