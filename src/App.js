import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import firebase from "./firebase";
import BookmarksPage from "./Pages/BookmarksPage/BookmarksPage";
import CoursesPage from "./Pages/CoursesPage/CoursesPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ExplorePage from "./Pages/ExplorePage/ExplorePage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import RenderWithoutTracking from "./Pages/VideoPlayer/RenderWithoutTracking";
import RenderWithTracking from "./Pages/VideoPlayer/RenderWithTracking";
import Notes from "./Pages/NotesPage/NotesPage"
import VideoPlayer from "./Pages/VideoPlayer/VideoPlayer";
import LandingPage from "./Pages/Dashboard/Landing"

import { UserContext } from "./UserContext";

const auth = firebase.auth();
const db = firebase.firestore();
export { db };

function App() {
  const [uid, setUid] = useState("");
  const value = { uid, setUid };
  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path={"/courses"} element={<CoursesPage />} />
          <Route path={"/explore"} element={<ExplorePage />} />
          <Route path={"/video-player"} element={<VideoPlayer />} />
          <Route path={"/video-player-track"} element={<RenderWithTracking />} />
          <Route path={"/bookmarks"} element={<BookmarksPage />} />
          <Route path={"/settings"} element={<SettingsPage />} />
          <Route path={"/notes"} element={<Notes />} />
          <Route
            path={"/video-player-no-track"}
            element={<RenderWithoutTracking />}
          />
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
