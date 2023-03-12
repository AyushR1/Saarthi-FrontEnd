import {
  CaretRightOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import handleAddCourse from "../../apis/addCourse";

import { getAllcourses } from "../../apis/CoursesApi";
const { Meta } = Card;
export default function CoursesPage() {
  const [courses, setCourses] = useState([])


  useEffect(() => {
    getAllcourses(setCourses)
  }, [])

  let userJson = localStorage.getItem('usersaarthi');
  let uid = userJson && JSON.parse(userJson).emails[0].value;


  // shuffle the courses array using Fisher-Yates shuffle algorithm
  for (let i = courses.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [courses[i], courses[j]] = [courses[j], courses[i]];
  }
  return (
    <div>
      <div className=" mx-8 md:mx-48 max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">

        <h2 className="lg:text-7xl md:text-5xl text-4xl font-bold bg-clip-text text-yellow-400 to-yellow-500">Top Picks for You! </h2>
        <br>
        </br>
        <h2 className="text-2xl font-bold text-white">Data Structure & Algorithms</h2>
        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {
            courses
              .filter((course) => course.cat === 'dsa')
              .map((cardData, index) => (
                <Card
                  key={cardData.id || index}
                  style={({ width: 300 }, { padding: 0 }, { margin: 20 })}
                  className="bg-gradient-to-b from-purple-100 to-white text-white w-300 p-0 m-20 border transition duration-500 ease-in-out transform hover:shadow-lg hover:-translate-y-1 hover:scale-105"

                  cover={
                    <img
                      alt="example"
                      src={cardData.avatar}
                    />
                  }
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
                  ]}
                  bordered={true}
                >
                  <Meta
                    avatar={<Avatar src={cardData.avatar} />}
                    title={cardData.title}
                    description={cardData.description}
                  />
                </Card>
              ))
          }
        </div>
        <br>
        </br>
        <h2 className="text-2xl font-bold text-white">Backend Development</h2>
        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {

            courses
              .filter((course) => course.cat === 'Backend')
              .map((cardData, index) => (
                <Card
                  key={cardData.id || index}
                  style={({ width: 300 }, { padding: 0 }, { margin: 20 })}
                  cover={
                    <img
                      alt="example"
                      src={cardData.avatar}
                    />}
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
                  ]}
                  bordered={true}
                >
                  <Meta
                    avatar={<Avatar src={cardData.avatar} />}
                    title={cardData.title}
                    description={cardData.description}
                  />
                </Card>
              ))
          }

        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      </div>
    </div>
  );
}

