import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import firebase from "./firebase";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ExplorePage from "./Pages/ExplorePage/ExplorePage";
import RenderWithoutTrackingyt from "./Pages/VideoPlayer/RenderWithoutTrackingyt";
import Notes from "./Pages/NotesPage/NotesPage"
import VideoPlayer from "./Pages/VideoPlayer/VideoPlayer";
import LandingPage from "./Pages/Dashboard/Landing"
import SearchPage from "./Pages/Dashboard/SearchPage"
import LandingHomePage from "./Pages/Dashboard/LandingHomePage";
import { UserContext } from "./UserContext";

const auth = firebase.auth();

function App() {
  const [uid, setUid] = useState("");
  const value = { uid, setUid };
  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingHomePage />} />
          <Route path={"/dashboard"} element={<Home />} />
          <Route path={"/explore"} element={<ExplorePage />} />
          <Route path={"/video-player"} element={<VideoPlayer />} />
          <Route path={"/explore-video"} element={<RenderWithoutTrackingyt />} />
          <Route path={"/notes"} element={<Notes />} />
          <Route path={"/search"} element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

function Home() {
  const [userLoggedIn] = useAuthState(auth);


  return (
    userLoggedIn ? <Dashboard /> : <LandingPage />
  );
}


export default App;
