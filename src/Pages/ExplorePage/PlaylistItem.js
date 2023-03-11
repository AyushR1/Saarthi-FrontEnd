import {
  CaretRightOutlined,
  PlusCircleOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Popconfirm, Popover } from "antd";

import { useContext } from "react";
import { Link } from "react-router-dom";
import handleAddCourse from "../../firestore/addCourse";
import { UserContext } from "../../UserContext";
import "./ExplorePage.css";

const { Meta } = Card;

const PlaylistItem = ({ playlistID, playlist }) => {
  const { uid } = useContext(UserContext);

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
export default PlaylistItem;
