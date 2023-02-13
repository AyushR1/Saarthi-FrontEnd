import {
  CaretRightOutlined,
  CopyOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import handleAddToBookamrk from "../../firestore/addBookmarks";
import handleAddCourse from "../../firestore/addCourse";
import { UserContext } from "../../UserContext";
import { getAllcourses } from "../../utils/CoursesApi";
import Navbar from "../../Components/Navbar/Navbar";
const { Meta } = Card;


export default function CoursesPage() {
  const [courses, setCourses] = useState([])


  useEffect(() => {
    getAllcourses(setCourses)
  }, [])
  const { uid } = useContext(UserContext);
  return (
    <div>
      <Navbar />
      <div className=" mx-8 max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
        <h2 className="text-2xl font-bold text-white">Data Structure & Algorithms</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {courses.map((cardData) => (
            <Card
              key={cardData.id}
              style={({ width: 300 }, { padding: 0 }, { margin: 20 })}
              actions={[
                <Link
                  to="/video-player"
                  state={{
                    playlistID: cardData.playlistID,
                    tracking: false,
                  }}
                >
                  <CaretRightOutlined key="Play" />
                </Link>,
                <PlusCircleOutlined
                  key="Enroll"
                  onClick={() => {
                    handleAddCourse(cardData.playlistID, uid);
                  }}
                />,
                <CopyOutlined
                  onClick={() => {
                    handleAddToBookamrk(
                      cardData.playlistID,
                      uid,
                      cardData.title
                    );
                  }}
                />,
              ]}
              bordered={true}
            >
              <Meta
                avatar={
                  <Avatar src={cardData.avatar} />
                }
                title={cardData.title}
                description={cardData.description}
              />
            </Card>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      </div>


      <Footer />
    </div>
  );
}

