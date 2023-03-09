import {
    CaretRightOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";

import handleAddCourse from "../../firestore/addCourse";
import signInWithGoogle from "../../firestore/Signin";
import { UserContext } from "../../UserContext";
import React, { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { getAllcourses } from "../../utils/CoursesApi";
import { useEffect, useState } from "react";

const { Meta } = Card;
export default function LandingPage() {
    const [courses, setCourses] = useState([])


    useEffect(() => {
        getAllcourses(setCourses)
    }, [])
    const { uid } = useContext(UserContext);
    return (
        <div>
            <Navbar />
            <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                    {/* Hero content */}
                    <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
                        {/* Section header */}
                        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                            <h1 className="h1 text-white text-4xl md:text-9xl font-bold mb-4" data-aos="fade-up">
                                Welcome to Saarthi!
                            </h1>
                            <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
                                Gain skills distraction free for free!
                            </p>
                            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                                <div data-aos="fade-up" data-aos-delay="400">
                                    <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0" onClick={signInWithGoogle} >
                                        Sign to Get Started!
                                    </button>
                                </div>
                                <div data-aos="fade-up" data-aos-delay="600">
                                    <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="https://www.github.com/ayushr1">
                                        Contribue on Github
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section>
                <div className="mx-4 md:mx-48 max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
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
            </section>

        </div>
    );
}