import React from "react";
import RenderWithTracking from "./RenderWithTracking";
import { useLocation } from "react-router-dom";
import RenderWithoutTrackingyt from "./RenderWithoutTrackingyt";
const VideoPlayer = ({ location }) => {
  let { state } = useLocation();
  let playlistID = state.playlistID;

  if (playlistID === undefined) {
    playlistID = localStorage.getItem("playlist-id");
  } else {
    localStorage.setItem("playlist-id", playlistID);
  }
 
  let tracking = state.tracking;
  if (tracking === undefined) {
    tracking = localStorage.getItem("tracking");
  } else {
    localStorage.setItem("tracking", tracking);
  }

  if (tracking) {
    return <RenderWithTracking playlistID={playlistID} />;
  } else {
    return <RenderWithoutTrackingyt playlistID={playlistID} />;
  }
};

export default VideoPlayer;
