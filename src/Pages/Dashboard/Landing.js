import signInWithGoogle from "../../firestore/Signin";
import Navbar from "../../Components/Navbar/Navbar";
import CoursesPage from "./CoursesPage";

export default function LandingPage() {

    return (<div>
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
        <CoursesPage/>
    </div>
    );
}