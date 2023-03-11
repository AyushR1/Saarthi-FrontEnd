import { useLocation } from "react-router-dom";

import React, { useState, useEffect } from "react";
import instance from "../../apis/youtube";
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

            <div className=" pt-8 md:mx-48  top-6">
                <div className="mainbody">
                    <div className="allplaylists">
                        <PlaylistsList className="playlist-item" playlists={playlists} />
                    </div>
                </div>
            </div>
        </div>
    );
}
