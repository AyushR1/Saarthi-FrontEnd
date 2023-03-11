import { Checkbox, Collapse, Layout, Menu , message} from "antd";

import Navbar from "../../Components/Navbar/Navbar";
import { useCallback, useContext, useEffect, useState } from "react";
import ReactLinkify from "react-linkify";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import axios from "axios";
const { Sider, Content } = Layout;
const { Panel } = Collapse;

const RenderWithoutTrackingsaved = ({ playlistID }) => {
  const [playlistData, setPlaylistData] = useState(null);


  const [currentVideo, setCurrentVideo] = useState();
  const [videoDescription, setVideoDescription] = useState("");
  const selectedMenuItem = currentVideo;

  const getDataCB = useCallback(async () => {
    axios
      .get(`http://localhost:5000/enrolled-courses/savedcoursesuid/${playlistID}`)
      .then(({ data }) => {
        setPlaylistData(data);
        setFirstUnwatchedVideo(data);
        setVideoDescription(data.videos[0].description);
      })
  }, [playlistID]);

  useEffect(() => {
    getDataCB();
  }, [getDataCB]);

  const setFirstUnwatchedVideo = (data) => {
    if (data) {
      const firstUnwatchedVideo =
        data.videos[
          data.videos.indexOf(
            data.videos.find((item) => item.watched === false)
          )
        ].videoId;
      setCurrentVideo(firstUnwatchedVideo);
    }
  };

  const handleVideoEnded = () => {
    let idx;
    playlistData.videos.forEach((video) => {
      if (video.videoId === currentVideo) {
        idx = playlistData.videos.indexOf(video);
      }
    });
    idx === -1
      ? setCurrentVideo(currentVideo)
      : setCurrentVideo(playlistData.videos[++idx].videoId);
    setVideoDescription(playlistData.videos[idx].description);
  };

  const returnIframMarkup = () => {
    let videoURL = `https://www.youtube.com/embed/${currentVideo}`;
    return (
      <div className="h-96 sm:min-h-[91vh] ">
        <ReactPlayer
          controls={true}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          url={videoURL}
          playing={true}
          className="react-player"
          width="100%"
          height="100%"
          onEnded={handleVideoEnded}
        ></ReactPlayer></div>
    );
  };

  const RenderMenuItem = ({ videos }) => {
    if (videos === undefined) {
      return null;
    }
    const renderedMenuItem = videos.map((video) => {
      return (
        <Menu.Item
          key={video.videoId}
          className="menu-item"
          style={{ fontSize: 12 }}
          onClick={() => {
            setVideoDescription(video.description);
            setCurrentVideo(video.videoId);
          }}
        >
          <Checkbox
            className="menu-checkbox"
            checked={video.watched}
            onChange={() => {
              message.error("Your Progress Won't be saved");
    
            }}
          ></Checkbox>
          {video.title}
        </Menu.Item>
      );
    });
    return <Menu selectedKeys={[selectedMenuItem]}>{renderedMenuItem}</Menu>;
  };

  return (
    <div>
      <Navbar />
      <Layout>
        <Sider
          width={384}
          collapsedWidth={65}
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            left: 0,
          }}
          className=" hidden sm:block"
        >
          <Menu theme="light" mode="inline" selectedKeys={[selectedMenuItem]}>
            <Menu.Item key="9" className="text-center">
              <h2>Videos</h2>
            </Menu.Item>
            {playlistData ? (
              <RenderMenuItem videos={playlistData.videos} />
            ) : (
              " "
            )}
            <Menu.Item key="8" style={{ paddingBottom: 80 }}></Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout sm:ml-96" >
          <Content style={{ margin: "10px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background sm:min-h-fit"
              style={{ textAlign: "center" }}
            >
              {returnIframMarkup()}
            </div>
            <Collapse bordered={false} defaultActiveKey={[""]}>
              <Panel header="Description" key="1">
                <ReactLinkify>
                  <span className="description-span">{videoDescription}</span>{" "}
                </ReactLinkify>
              </Panel>
            </Collapse>
          </Content>

          <div className="block sm:hidden">
            <Menu theme="light" selectedKeys={[selectedMenuItem]}>
              <Menu.Item key="9" style={{ width: "100%", textAlign: "center" }}>
                <h2>Videos</h2>
              </Menu.Item>
              {playlistData ? (
                <RenderMenuItem videos={playlistData.videos} />
              ) : (
                " "
              )}
              <Menu.Item key="8"></Menu.Item>
            </Menu>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default RenderWithoutTrackingsaved;
