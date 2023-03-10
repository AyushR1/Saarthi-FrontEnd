import { useLocation } from "react-router-dom";

import React, { useState, useEffect } from "react";
import instance from "../../apis/youtube";
import Footer from "../../Components/Footer/Footer";
import "../ExplorePage/ExplorePage.css"
import PlaylistsList from "../ExplorePage/PlaylistsList";
import Navbar from "../../Components/Navbar/Navbar"

export default function SearchPage() {
    const location = useLocation();
    const search = location.state?.search;
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get("/search", {
                    params: {
                        q: search,
                    },
                });
                setPlaylists(response.data.items);
            } catch (error) {
                console.log(error);
            }
        };
        if (search) {
            fetchData();
        }
    }, [search]);

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
                    <div className="allplaylists">
                        <PlaylistsList className="playlist-item" playlists={playlists} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
