import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Col, message, Popconfirm, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { UserContext } from "../../UserContext";
import Navbar from "../../Components/Navbar/Navbar"

export default function SettingsPage() {
  const { uid } = useContext(UserContext);
  const [enrolledCourses, setEnrolledCourses] = useState({});

  const coursesRef = db
    .collection("users")
    .doc(uid)
    .collection("currentlyEnrolled");

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("currentlyEnrolled")
      .get()
      .then((docs) => {
        let enrolled = [];
        docs.forEach((doc) => {
          enrolled.push(doc.data());
        });
        setEnrolledCourses({ data: enrolled });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteBookmarks = async () => {
    const hideLoading = message.loading("Deleting bookmarks...", 0);
    const userData = await db.collection("users").doc(uid).get();

    let bookmarks = await userData.data().bookmarks;
    bookmarks.splice(0, bookmarks.length);
    db.collection("users").doc(uid).set({ bookmarks });

    setTimeout(hideLoading, 0);
    message.success("All bookmarks have been deleted!");
  };

  const handleUnenrollFromCourses = () => {
    const hideLoading = message.loading("Unenrolling from courses...", 0);

    enrolledCourses.data.map((course) =>
      coursesRef.doc(course.playlistInfo.playlistID).delete()
    );

    setTimeout(hideLoading, 1000);
    message.success("Successfully unenrolled from all courses!");
  };
  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <div className="flex flex-col md:flex-row">
    
        <Col className="gutter-row" span={12} align="center">
          <Card title="Delete Bookmarks" style={{ width: 300 }}>
            <Popconfirm
              title="Are you sure you want to delete all bookmarks?"
              onConfirm={() => {
                handleDeleteBookmarks();
                
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<CopyOutlined />}>
                Delete Bookmarks
              </Button>
            </Popconfirm>
          </Card>
        </Col>
        <Col className="gutter-row" span={12} align="center">
          <Card title="Unenroll from Courses" style={{ width: 300 }}>
            <Popconfirm
              title="Are you sure you want to unenroll from all courses? It'll delete your progress as well"
              onConfirm={() => {
                handleUnenrollFromCourses();
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<CopyOutlined />}>
                Unenroll from Courses
              </Button>
            </Popconfirm>
          </Card>
        </Col>
      </div>
    </div>
  );
}