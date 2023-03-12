import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RedirectPage from "./services/Redirect";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RenderWithoutTrackingyt from "./Pages/VideoPlayer/RenderWithoutTrackingyt";
import Notes from "./Pages/NotesPage/NotesPage"
import VideoPlayer from "./Pages/VideoPlayer/VideoPlayer";
import LandingPage from "./Pages/Dashboard/Landing"
import SearchPage from "./Pages/SearchPage/SearchPage"
import LandingHomePage from "./Pages/Home/LandingHomePage";

// Create an instance of the Firebase authentication service.

/**
 * The main component of the application.
 */
function App() {

  return (
    // Provide the user ID context to the application.

    <BrowserRouter>
      <Routes>
        {/* Define the different routes of the application */}
        <Route exact path="/" element={<LandingHomePage />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/video-player"} element={<VideoPlayer />} />
        <Route path={"/explore-video"} element={<RenderWithoutTrackingyt />} />
        <Route path={"/notes"} element={<Notes />} />
        <Route path={"/search"} element={<SearchPage />} />
        <Route path={"/loginredirect"} element={<RedirectPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

/**
 * The main content of the application, which is either the dashboard or the landing page.
 */


// Export the main application component.
export default App;
