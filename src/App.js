import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
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
  // Define a state variable for the user ID.

  const [user, setUser] = useState(null);
  const value = { user, setUser };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/login/success", {
          withCredentials: false,
        });

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          throw new Error("Authentication has failed.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);



  return (
    // Provide the user ID context to the application.
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          {/* Define the different routes of the application */}
          <Route exact path="/" element={<LandingHomePage />} />
          <Route path={"/dashboard"} element={user ? <Dashboard /> : <LandingPage />} />
          <Route path={"/video-player"} element={<VideoPlayer />} />
          <Route path={"/explore-video"} element={<RenderWithoutTrackingyt />} />
          <Route path={"/notes"} element={<Notes />} />
          <Route path={"/search"} element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

// Export the main application component.
export default App;
