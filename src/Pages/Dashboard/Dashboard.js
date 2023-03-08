import {
  CaretRightOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Card, message, Popconfirm, Popover, Progress } from "antd";
import "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import firebase, { db } from "../../firebase";
import { UserContext } from "../../UserContext";

const { Meta } = Card;

export default function Dashboard() {
  const [currentlyEnrolled, setCurrentlyEnrolled] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);
  const { setUid } = useContext(UserContext);
  const uid = firebase.auth().currentUser.uid;
  setUid(uid);



  const updateCurrentlyEnrolled = () => {
    fetch('/api/currently-enrolled', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setCurrentlyEnrolled({ data: data });
      })
      .catch(error => {
        console.error('Error fetching currently enrolled courses:', error);
      });
  };

  useEffect(() => {
    updateCurrentlyEnrolled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  useEffect(() => {
    calculateAndSetTotalProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCourseDelete = (playlistID) => {
    db.collection("users")
      .doc(uid)
      .collection("currentlyEnrolled")
      .doc(playlistID)
      .delete();
    message.success("Course Deleted Succesfully, Refresh the page !");
    updateCurrentlyEnrolled();
  };

  const calculateAndSetTotalProgress = async () => {
    let totalWatched = 0,
      totalVideos = 0;
    const data = await db
      .collection("users")
      .doc(uid)
      .collection("currentlyEnrolled")
      .get();
    data.docs.forEach((doc) => {
      totalWatched += doc.data().totalWatched;
      totalVideos += doc.data().videos.length;
    });
    const progress = Math.round((totalWatched / totalVideos) * 100);
    setTotalProgress(progress);
  };

  const RenderCards = ({ playlistData }) => {
    const renderedCards = playlistData.map((playlist) => {
      return (
        <div className="align-middle justify-items-center">
          <Card

            key={playlist.playlistInfo.playlistID}
            className="  max-w-sm text-center"
            actions={[
              <Popover title="Start learning">
                <Link
                  to="/video-player" state={{
                    playlistID: playlist.playlistInfo.playlistID,
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
                    handleCourseDelete(playlist.playlistInfo.playlistID)
                  }
                >
                  <DeleteOutlined />
                </Popconfirm>
              </Popover>,

            ]}
          >
            <Meta title={playlist.playlistInfo.title} />
          </Card>
        </div>
      );
    });
    return (
      <React.Fragment>
        {playlistData.length ? (
          <div><h2 class="text-3xl text-white">Enrolled Courses</h2>
            <br></br></div>) : (
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
        {renderedCards}
      </React.Fragment>
    );
  };

  return (

    <div>

      <Navbar />
      <div class=" my-20 flex flex-col md:flex-row  items-center justify-center">

        <div class="w-full lg:w-1/2 text-center">
          <div class=" w-96 mx-auto">
            {currentlyEnrolled.data ? (
              <RenderCards playlistData={currentlyEnrolled.data} />
            ) : (
              ""
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
      <Footer />
    </div >

  );
}

