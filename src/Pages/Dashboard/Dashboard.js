import {
  CaretRightOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Card, message, Popconfirm, Popover, Progress } from "antd";
import "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import firebase, { db } from "../../firebase";
import { UserContext } from "../../UserContext";
import axios from "axios";
import CompletedCoursesPage from "./CompletedPage"
import handleUpdateCourse from "../../firestore/updateCourse";
import getVideos from "../../apis/getVideos";

const { Meta } = Card;

export default function Dashboard() {
  const [currentlyEnrolled, setCurrentlyEnrolled] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const { setUid } = useContext(UserContext);
  const uid = firebase.auth().currentUser.uid;
  setUid(uid);

  // const syncPlayList = useCallback(async () => {
  //   const youtubePlayList = await getVideos(playlistID);

  //   if (youtubePlayList.length > playlistData.videos.length) {
  //     // new videos are added to the playlist by creator
  //     const newVideos = youtubePlayList.slice(playlistData.videos.length);
  //     handleUpdateCourse(playlistID, uid, newVideos);
  //     getDataCB()
  //   }
  // }, [getDataCB, playlistData, uid, playlistID]);

  // useEffect(() => {
  //   if (playlistData && playlistID) {
  //     syncPlayList();
  //   }
  // }, [currentVideo]);

  const syncPlayList = async (playlistID) => {
    const youtubePlayList = await getVideos(playlistID);
    const { data: playlistData } = await axios.get(`http://localhost:5000/enrolled-courses/${uid}/${playlistID}`);
    
    if (youtubePlayList.length > playlistData.videos.length) {
      const newVideos = youtubePlayList.slice(playlistData.videos.length);
      handleUpdateCourse(playlistID, uid, newVideos);
    }
  }
  

  const updateCurrentlyEnrolled = () => {
    axios
      .get(`http://localhost:5000/users/${uid}/enrolled-courses/playlist-info`)
      .then(({ data }) => {
        setCurrentlyEnrolled(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    updateCurrentlyEnrolled(setCurrentlyEnrolled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  useEffect(() => {
    calculateAndSetTotalProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCourseDelete = (playlistID) => {
    axios.delete(`http://localhost:5000/enrolled-courses/${uid}/${playlistID}`)
      .then(response => {
        message.success("Course Deleted Succesfully!");
        updateCurrentlyEnrolled(); // Call updateCurrentlyEnrolled after successful deletion
      })
      .catch(error => {
        console.error(error);
      });
  };

  const calculateAndSetTotalProgress = async () => {
    let totalWatched = 0,
      totalVideos = 0;

    try {
      const response = await axios.get(`http://localhost:5000/enrolled-courses/${uid}`);
      response.data.forEach((course) => {
        course.videos.forEach((video) => {
          if (video.watched) {
            totalWatched++;
          }
        });
        totalVideos += course.videos.length;
      });
      const progress = Math.round((totalWatched / totalVideos) * 100);
      setTotalProgress(progress);
    } catch (error) {
      console.log(error);
    }
  };

  const RenderCards = ({ playlistData }) => {
    const [progressMap, setProgressMap] = useState({});

    const calculateAndSetSpecificlProgress = async (playlistID) => {
      let totalWatched = 0,
        totalVideos = 0;

      try {
        const response = await axios.get(`http://localhost:5000/enrolled-courses/${uid}/${playlistID}`);

        response.data.videos.forEach((video) => {
          if (video.watched) {
            totalWatched++;
          }
          totalVideos++;
        });

        const progressspec = Math.round((totalWatched / totalVideos) * 100);

        setProgressMap(prevState => ({
          ...prevState,
          [playlistID]: progressspec
        }));
      } catch (error) {
        console.log(error);
      }
    };


    useEffect(() => {
      playlistData.flat().forEach((playlist) => {
        calculateAndSetSpecificlProgress(playlist.playlistID);
      });
    }, []);

    const renderedCards = playlistData.flat().map((playlist) => {
      const progressspec = progressMap[playlist.playlistID];

      return (
        <div className="align-middle justify-items-center">
          <div className=" columns-2"><Card
            key={playlist.playlistID}
            className="  max-w-sm text-center"
            actions={[
              <Popover title="Start learning">
                <Link
                  to="/video-player" state={{
                    playlistID: playlist.playlistID,
                    tracking: true,
                  }}
                >

                  <CaretRightOutlined key="play" />
                </Link>
              </Popover>,
              <Popover title="Delete the course">
                <Popconfirm
                  title={
                    "Are you sure you wanna delete this course, all progress will be lost"
                  }
                  placement="top"
                  onConfirm={() =>
                    handleCourseDelete(playlist.playlistID)
                  }
                >
                  <DeleteOutlined />
                </Popconfirm>
              </Popover>,
              <Popover title="Update the course">
                <Popconfirm
                  title={
                    "Check if new videos added and update"
                  }
                  placement="top"
                  onConfirm={() =>
                    syncPlayList(playlist.playlistID)
                  }
                >
                  <DeleteOutlined />
                </Popconfirm>
              </Popover>,

            ]}
          >
            <Meta title={playlist.title} />
          </Card>
            <Popover title="Expand, show more detailed progress">
              <Progress
                type="circle"
                percent={progressspec}
                width={150}
              ></Progress>
            </Popover>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <div><h2 class="text-3xl text-white">Enrolled Courses</h2>        {renderedCards}</div>
      </React.Fragment>
    );
  };

  return (

    <div>

      <Navbar />
      <div class=" my-20 flex flex-col md:flex-row  items-center justify-center">

        <div class="w-full lg:w-1/2 text-center">
          <div class=" md:mx-48 w-auto ">
            {currentlyEnrolled.length ? (
              <RenderCards playlistData={currentlyEnrolled} />
            ) : (
              <Card
                title="No Courses Enrolled"
                bordered={false}
                style={{ width: 300, height: 350, marginTop: 110 }}
              >
                <h5 align="left">
                  You haven't enrolled in any course, please{" "}
                  <Link to="/explore">Search</Link> for a course and enroll in it by
                  clicking the <PlusCircleOutlined /> button.
                </h5>
              </Card>
            )}
          </div>
        </div>
        <div class="w-full lg:w-1/2 text-center">
          <div class="w-64 mx-auto">
            <h2 class="text-3xl text-white">Progress</h2>
            <br></br>
            <div class="w-64 h-64 bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
              <div class="text-center">
                <Popover title="Expand, show more detailed progress">
                  <Progress
                    type="circle"
                    percent={totalProgress}
                    width={207}
                  ></Progress>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompletedCoursesPage />
    </div >

  );
}

