import { Card } from "antd";
import React from "react";
import instance from "../../apis/youtube";
import Footer from "../../Components/Footer/Footer";
import "./ExplorePage.css";
import PlaylistsList from "./PlaylistsList";
import SearchBar from "./SearchBar";
import Navbar from "../../Components/Navbar/Navbar";


class ExplorePage extends React.Component {
  state = {
    playlists: [],
  };
  handleSubmit = async (termFromSearchBar) => {
    const response = await instance.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });

    this.setState({
      playlists: response.data.items,
    });
  };

  render() {
    return (
      <div>
        <Navbar />

        <div className="container  top-16">
          <div className="mainbody">
            <div className="explorer-title ">
              <h1 className=" text-6xl font-bold text-white">Explore Courses! Search it here!</h1>
            </div>
            <br></br>
            
            <div style={({ width: 50 }, { padding: 0 }, { margin: 20 })}>
            <SearchBar handleFormSubmit={this.handleSubmit} />
            </div>
            <div className="allplaylists">
              <PlaylistsList
                className="playlist-item"
                playlists={this.state.playlists}
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ExplorePage;
