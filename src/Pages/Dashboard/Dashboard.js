import {
  CaretRightOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusCircleOutlined,
  LeftOutlined, RightOutlined
} from "@ant-design/icons";
import { Card, message, Popconfirm, Popover, Progress } from "antd";
import "firebase/firestore";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import firebase from "../../firebase";
import { UserContext } from "../../UserContext";
import axios from "axios";
import CompletedCoursesPage from "./CompletedPage"
import handleUpdateCourse from "../../apis/updateCourse";
import getVideos from "../../apis/getVideos";
import { Carousel } from "antd";
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
    const { data: playlistData } = await axios.get(`http://localhost:5000/user/getvideos/${uid}/${playlistID}`);

    if (youtubePlayList.length > playlistData.videos.length) {
      const newVideos = youtubePlayList.slice(playlistData.videos.length);
      handleUpdateCourse(playlistID, uid, newVideos);
    }
  }


  const updateCurrentlyEnrolled = () => {
    axios
      .get(`http://localhost:5000/user/allcourses/${uid}`)
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
    axios.delete(`http://localhost:5000/user/deletevideos/${uid}/${playlistID}`)
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
      const response = await axios.get(`http://localhost:5000/user/progressallcourses/${uid}`);
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
        const response = await axios.get(`http://localhost:5000/user/getvideos/${uid}/${playlistID}`);

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
    }, [playlistData]);

    const ref = useRef();

    const renderedCards = playlistData.flat().map((playlist) => {
      const progressspec = progressMap[playlist.playlistID];

      return (
        <div key={playlist.playlistID} className="align-middle justify-items-center">
          <br />
          <div className="">
            <Card
              className="max-w-xs md:max-w-sm text-center"
              actions={[
                <Popover title="Start learning">
                  <Link to="/video-player" state={{
                    playlistID: playlist.playlistID,
                    tracking: true,
                  }}>
                    <CaretRightOutlined key="play" />
                  </Link>
                </Popover>,
                <Popover title="Delete the course">
                  <Popconfirm
                    title="Are you sure you want to delete this course? All progress will be lost."
                    placement="top"
                    onConfirm={() => handleCourseDelete(playlist.playlistID)}
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </Popover>,
                <Popover title="Update the course">
                  <Popconfirm
                    title="Check if new videos have been added and update?"
                    placement="top"
                    onConfirm={() => syncPlayList(playlist.playlistID)}
                  >
                    <ReloadOutlined />
                  </Popconfirm>
                </Popover>,
              ]}
            >
              <Meta title={playlist.title} />
              <br />
              <div className="rounded-lg flex items-center justify-center">
                <Popover title="Your progress">
                  <Progress type="circle" percent={progressspec} width={185} />
                </Popover>
              </div>
            </Card>
          </div>
        </div>
      );
    });

    // from https://react-slick.neostack.com/docs/example/custom-arrows
    const SampleNextArrow = props => {
      const { className, style, onClick } = props
      return (
        <div
          className={className}
          style={{ ...style, display: "block" }}
          onClick={onClick}
        >
          <RightOutlined style={{ fontSize: "24px", color: "white" }} />
          <span style={{ fontSize: "24px", color: "white" }}></span>
        </div>)
    }


    const SamplePrevArrow = props => {
      const { className, style, onClick } = props
      return (
        <div
          className={className}
          style={{ ...style, display: "block" }}
          onClick={onClick}
        >
          <LeftOutlined style={{ fontSize: "24px", color: "white" }} />
          <span style={{ fontSize: "24px", color: "white" }}></span>
        </div>)
    }
    const settings = {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }
    return (
      <React.Fragment>
        <div>
          <h2 className="text-3xl text-white">Enrolled Courses</h2>
          <div className="playlist-container h-96">
            {/* Wrap the renderedCards in the Carousel component */}
            <Carousel ref={ref} arrows {...settings} draggable swipe effect="fade" dots >
              {renderedCards}
            </Carousel>

          </div>

        </div>
      </React.Fragment>
    );
  };



  return (

    <div>

      <Navbar />
      <div className=" my-20 flex flex-col md:flex-row  items-center justify-center">

        <div className="w-full lg:w-1/2 text-center">
          <div className=" md:mx-48 w-80 mx-auto ">
            {currentlyEnrolled.length ? (
              <div>
                <RenderCards playlistData={currentlyEnrolled} />
              </div>
            ) : (
              <div>
                <br></br>
                <div><h2 className="text-3xl text-white">Enrolled Courses</h2>
                  <br></br>
                  <div className="h-96">
                    <div className=" w-80 h-80 bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                      <Card
                        title="No Courses Enrolled"
                        bordered={true}
                        className=" max-w-xs md:max-w-sm text-center"
                      >
                        <h5 align="left">
                          You haven't enrolled in any course, please{" "}
                          <Link to="/explore">Search</Link> for a course and enroll in it by
                          clicking the <PlusCircleOutlined /> button.
                        </h5>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
        <div className="w-full lg:w-1/2 text-center">
          <div className="w-80 mx-auto">

            <br></br>
            <h2 className="text-3xl text-white">Total Progress</h2>
            <br></br>
            <div className="h-96">
              <div className=" w-80 h-80 bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <Popover title="Expand, show more detailed progress">
                    <Progress
                      type="circle"
                      percent={totalProgress}
                      width={300}
                    ></Progress>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CompletedCoursesPage />
    </div >

  );
}

