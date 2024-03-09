import { CiHeart, CiSettings, CiUser } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import ProfileSection from "./ProfileSection";
import HomeSection from "./HomeSection";

const Dashboard = () => {
    return (
        <div className="relative w-screen h-screen">
            <section style={{ scrollbarWidth: "none" }} className="min-w-[280px] max-w-[300px] rounded-r-xl bg-gray-950 shadow-gray-900 shadow-lg h-screen overflow-y-scroll overflow-x-hidden sticky top-0 left-0 z-30">
                <div className="">
                    Code Hawks
                </div>
                <div>
                    Account
                </div>
                <nav>
                    <div>
                        <MdDashboard />
                        Home
                    </div>
                    <div>
                        <CiUser />
                        Profile
                    </div>
                    <div>
                        <FaMapMarkedAlt />
                        Find On Map
                    </div>
                    <div>
                        <CiSettings />
                        Settings
                    </div>

                </nav>

                <div>
                    Chat Rooms
                </div>
                <div>
                    #Room 1
                </div>
                <div>
                    #Room 1
                </div>
                <div>
                    #Room 1
                </div>

            </section>

            <section>
                <HomeSection />
            </section>


        </div>
    );
}

export default Dashboard;
