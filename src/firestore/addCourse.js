import { message } from "antd";
import getVideos from "../apis/getVideos";


const videos = [];
const handleAddCourse = async (playlistID, uid) => {
  //
  if (uid === "") {
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

  fetch(`/enrolled-courses/${uid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      playlistInfo: playlistInfo,
      videos: videos
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  message.info("Course added Succesfuly");
};

export default handleAddCourse;
