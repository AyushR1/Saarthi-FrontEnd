import { useLocation } from "react-router-dom";

import React, { useState, useEffect, useContext } from "react";
import instance from "../../apis/youtube";
import "./SearchPage.css"
import Navbar from "../../Components/Navbar/Navbar"


import {
    CaretRightOutlined,
    PlusCircleOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Popconfirm, Popover } from "antd";

import { Link } from "react-router-dom";
import handleAddCourse from "../../apis/addCourse";

const { Meta } = Card;

const PlaylistItem = ({ playlistID, playlist }) => {
    let uid = JSON.parse(localStorage.getItem('usersaarthi')).emails[0].value;

    const yt = "https://youtube.com/playlist?list=" + playlistID;
    return (
        <Card
            style={({ width: 50 }, { padding: 0 }, { margin: 20 })}
            actions={[
                <Popover content="Youtube FREE has limits. Consider previewing on Youtube!. To track you can sign in and if you want to track enroll for this course.">
                    <Link
                        to="/explore-video" state={{
                            playlistID,
                            tracking: false,

                        }}
                        onClick={(e) => {
                            if (!window.confirm("FREE has limits on search and play. Consider previewing on Youtube and then enroll.")) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <CaretRightOutlined key="Play" />
                    </Link>
                </Popover>,
                <Popover content="Enroll Course">
                    <Popconfirm
                        title="Enroll for this course"
                        onConfirm={() => {
                            handleAddCourse(playlist.id.playlistId, uid);
                        }}
                    >
                        <PlusCircleOutlined key="Enroll" />
                    </Popconfirm>
                </Popover>,
                <Popover content="You should support teeacher! Watch it on YT">
                    <a href={yt} target="_blank" rel="noreferrer">
                        <YoutubeOutlined key="Open In Youtube" />
                    </a>
                </Popover>,
            ]}
            bordered={true}
        >
            <Meta
                avatar={<Avatar src={playlist.snippet.thumbnails.default.url} />}
                title={playlist.snippet.title}
                description={playlist.snippet.description}
            />
        </Card>
    );
};



const PlaylistsList = ({ playlists }) => {
    const renderedPlaylists = playlists.map((playlist) => {
        return (
            <PlaylistItem
                key={JSON.stringify(playlist.id.playlistId)}
                playlistID={playlist.id.playlistId}
                playlist={playlist}
            />
        );
    });
    return <div>{renderedPlaylists}</div>;
};


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
