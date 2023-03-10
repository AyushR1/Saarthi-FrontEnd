import React from "react";
import RenderWithoutTracking from "./RenderWithoutTracking";
import RenderWithTracking from "./RenderWithTracking";
import { useSearchParams } from "react-router-dom";

const VideoPlayer = () => {
  const [searchParams] = useSearchParams();
  const playlistID = searchParams.get("playlistID") || localStorage.getItem("playlist-id");
  const tracking = searchParams.get("tracking") || localStorage.getItem("tracking");

  if (tracking) {
    return <RenderWithTracking playlistID={playlistID} />;
  } else {
    return <RenderWithoutTracking playlistID={playlistID} />;
  }
};

export default VideoPlayer;
