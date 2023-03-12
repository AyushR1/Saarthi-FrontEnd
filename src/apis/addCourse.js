import { message } from "antd";
import getVideos from "../apis/getVideos";
import axios from "axios";

const handleAddCourse = async (playlistID, uid) => {

  const videos = [];

  if (!uid) {
    message.error("Not Logged In");
    return;
  }
  const items = await getVideos(playlistID);
  let playlistInfo = {
    thumbnail: items[0].snippet.thumbnails.medium.url,
    title: items[0].snippet.title,
    playlistID,
  };
  items.forEach((item) => {
    videos.push({
      videoId: item.snippet.resourceId.videoId,
      watched: false,
      title: item.snippet.title,
      description: item.snippet.description,
    });
  });
  axios.post(`http://localhost:5000/user/addcourse/uid`, {
    uid: uid,
    playlistInfo: playlistInfo,
    videos: videos
  })
    .then(response => {
      message.info("Course added successfully");
    })
    .catch(error => {
      console.error(error);
      if (error.response && error.response.status === 400 && error.response.data.error === "Playlist already enrolled") {
        message.warning("Course already enrolled");
      } else {
        message.error("Error adding course");
      }
    });
};

export default handleAddCourse;
