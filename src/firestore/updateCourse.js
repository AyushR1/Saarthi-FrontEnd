import { message } from "antd";
import axios from "axios"
const handleUpdateCourse = async (playListId, uid, newVideos) => {
  const videos = [];
  if (uid === "") {
    message.error("Not Logged In");
    return;
  }

  newVideos.forEach((item) => {
    videos.push({
      videoId: item.snippet.resourceId.videoId,
      watched: false,
      title: item.snippet.title,
      description: item.snippet.description,
    });
  });
  axios.post(`http://localhost:5000/updatecourse`, {
    uid: uid,
    playlistID: playListId,
    videos: videos
  })
    .then(response => {
      console.log(response.data);
      message.info("Course Updated successfully");
    })
    .catch(error => {
      console.error(error);
      if (error.response && error.response.status === 400 && error.response.data.error === "Playlist already enrolled") {
        message.warning("Course already enrolled");
      } else {
        message.error("Error adding course");
      }
    });
  message.info("Update course successfully");
};

export default handleUpdateCourse;
