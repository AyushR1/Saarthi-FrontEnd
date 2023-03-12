
import Navbar from "../../Components/Navbar/Navbar";
import CoursesPage from "../../Components/Courses/CoursesPage";
import { Carousel } from 'antd';

export default function LandingHomePage() {

    return (<div>
        <Navbar />
        <Carousel className=" shadow-2xl" autoplay effect="fade" >
            <div className="md:h-96  relative justify-center">
                <img className=" w-100vh absolute overflow-hidden top-1/2 transform  -translate-y-1/4 md:-translate-y-1/2" src="https://github.com/AyushR1/randomdump/raw/main/Blue%20Pink%20Gradient%20Fashion%20Banner.png" alt="Nature" />
            </div>
            <div className="md:h-96 h-36 relative justify-center">
                <img className=" w-100vh absolute overflow-hidden top-1/2 transform  -translate-y-2/4 md:-translate-y-1/2" src="  https://github.com/AyushR1/randomdump/raw/main/Thank%20You%20(Banner%20(Landscape)).png" alt="Nature" />
            </div>
 
        </Carousel>
        <CoursesPage />
    </div>
    );
}