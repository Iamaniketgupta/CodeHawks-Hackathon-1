import Buttons from "./subcomponents/Buttons";
import homeimg2 from "../assets/homeimg2.png";
import homeimg3 from "../assets/homeimg3.jpg";
import homeimg4 from "../assets/homeimg4.png";
import { Link } from "react-router-dom";
const Home = () => {


    return (
        <>
            <section className="hero-section text-center w-full h-full flex justify-center items-center p-5">
                <div className="max-w-[600px] mx-auto">
                    <h1 className="my-5 mx-auto font-bold text-6xl leading-tight">Elevate Your Sports Experience</h1>
                    <p className="p-5 mb-4 text-center">Fuel Your Passion, Connect with Play
                        Discover nearby sports activities and find your perfect team. Join us to elevate your sports journey.</p>
                    <Link to={"/api/login"}>
                        <Buttons text={"Start Connecting for Free"} />
                    </Link>
                </div>

            </section>


            <section className=" w-full items-center p-5 bg-[#181a1d] text-white">
                <div className="max-w-[1000px] mx-auto text-center">
                    <h1 className="my-5 mx-auto font-bold text-4xl leading-tight">Discover Near By Sports People</h1>
                    <div className="relative ">
                        <div className="absolute inset-0 bg-black bg-opacity-20 cursor-pointer hover:opacity-30"></div>
                        <img src={homeimg2} alt="" className="block mt-10 mb-5 w-full h-[60%]" />
                    </div>
                </div>

            </section>



            <section className="w-full min-h-[400px] flex items-center justify-center p-5 flex-wrap">
                <div className="max-w-[600px] min-w-[300px] flex-1">
                    <h2 className="my-5 font-bold text-5xl leading-tight">Make Your Teams and Connect with People </h2>
                    <p className="text-lg text-gray-600 mb-5">Create collaborative teams effortlessly and achieve your goals together.</p>
                </div>
                <div className="max-w-[600px] min-w-[300px] h-full flex-1">
                    <img src={homeimg4} alt="" className="w-full h-[300px]" />
                </div>
            </section>


            <section className="w-full h-[350px] ">
                <div className=" min-w-[300px] ">
                    <h2 className="my-5 font-bold max-sm:text-3xl text-4xl leading-tight text-center">Meet the Developers</h2>
                </div>
                <div className=" min-w-[300px] text-2xl flex items-center justify-center p-5 gap-3 flex-wrap">

                <a href="https://linkedin.com/in/iamaniketgupta" target="_blank">  <h3 className="p-3 text-center bg-blue-600 rounded-lg text-white font-bold m-4 min-w-[200px]">Aniket Gupta</h3> </a>
                    <a href="https://linkedin.com/in/suraj-singh-431010248" target="_blank"><h3 className="p-3 bg-blue-600 rounded-lg text-white font-bold m-4 min-w-[200px] text-center">Suraj Singh</h3></a>
                </div>
            </section>


        </>
    );
}

export default Home;
