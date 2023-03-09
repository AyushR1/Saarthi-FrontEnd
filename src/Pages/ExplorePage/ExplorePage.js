import React, { useState } from "react";
import instance from "../../apis/youtube";
import Footer from "../../Components/Footer/Footer";
import "./ExplorePage.css";
import PlaylistsList from "./PlaylistsList";
import SearchBar from "./SearchBar";
import Navbar from "../../Components/Navbar/Navbar";

function ExplorePage() {
  const [playlists, setPlaylists] = useState([]);

  const handleSubmit = async (termFromSearchBar) => {
    const response = await instance.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });

    setPlaylists(response.data.items);
  };

  return (
    <div>
      <Navbar />

      <div className="container top-16">
        <div className="mainbody">
          <div className="explorer-title ">
            <h1 className="text-6xl font-bold text-white">
              Explore Courses! Search it here!
            </h1>
          </div>
          <br></br>

          <div style={({ width: 50 }, { padding: 0 }, { margin: 20 })}>
              <SearchBar handleFormSubmit={handleSubmit} />
          </div>
          <div className="allplaylists">
            <PlaylistsList className="playlist-item" playlists={playlists} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ExplorePage;
