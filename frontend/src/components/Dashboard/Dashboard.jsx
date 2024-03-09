import { CiHeart, CiSettings, CiUser } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import ProfileSection from "./ProfileSection";
import HomeSection from "./HomeSection";
import Followers from "./subSections/Followers";
import { useState } from "react";
import SettingsSection from "./SettingsSection";
import MapSection from "./MapSection";

const Dashboard = () => {
    const navTabs = [
        "profile",
        "home",
        "map",
        "settings"
    ]


    const [activeNavTab, setActiveNavTab] = useState(navTabs[0])

    function handlerNavTabs(val) {
        setActiveNavTab(val);
    }

    return (
        <div className="relative w-screen h-screen flex gap-10">
            <section style={{ scrollbarWidth: "none" }} className="font-semibold  min-w-[230px] max-w-[230px] rounded-r-xl bg-gray-[#0e0001] shadow-blue-500 shadow-sm h-screen overflow-y-scroll overflow-x-hidden sticky top-0 left-0 z-30">
                <div className="h-20 p-5 my-2 ">
                    Code Hawks
                </div>
                <div className="h-[1px] bg-white"></div>
                <div className="h-10 p-3 pl-3 text-sm text-blue-500">
                    Account
                </div>
                <nav className="flex flex-col max-h-fit">
                    <div onClick={() => handlerNavTabs("home")}
                        className={`flex h-10 items-center my-3  gap-5 hover:text-blue-500 cursor-pointer ${activeNavTab === 'home' ? 'text-blue-500' : ''}`}>
                        <div className={`w-1 h-10 ${activeNavTab === 'home' ? 'bg-blue-500' : ''}`}></div>
                        <MdDashboard />
                        Home
                    </div>
                    <div onClick={() => handlerNavTabs("profile")}
                        className={`flex h-10 items-center my-3  gap-5 hover:text-blue-500 cursor-pointer ${activeNavTab === 'profile' ? 'text-blue-500' : ''}`}>
                        <div className={`w-1 h-10 ${activeNavTab === 'profile' ? 'bg-blue-500' : ''}`}></div>
                        <CiUser />
                        Profile
                    </div>
                    <div onClick={() => handlerNavTabs("map")}
                        className={`flex h-10 items-center my-3  gap-5 hover:text-blue-500 cursor-pointer ${activeNavTab === 'map' ? 'text-blue-500' : ''}`}>
                        <div className={`w-1 h-10 ${activeNavTab === 'map' ? 'bg-blue-500' : ''}`}></div>
                        <FaMapMarkedAlt />
                        Find On Map
                    </div>
                    <div onClick={() => handlerNavTabs("settings")}
                        className={`flex h-10 items-center my-3  gap-5 hover:text-blue-500 cursor-pointer ${activeNavTab === 'settings' ? 'text-blue-500' : ''}`}>
                        <div className={`w-1 h-10 ${activeNavTab === 'settings' ? 'bg-blue-500' : ''}`}></div>
                        <CiSettings />
                        Settings
                    </div>
                </nav>

                <div className="h-10 p-3 pl-3 mt-5 text-sm text-blue-500">
                    Chat Rooms
                </div>

                <div className="flex h-10 items-center my-3 gap-5 hover:text-blue-500 text-blue-500 cursor-pointer">
                    <div className="w-1 bg-blue-500 h-10"></div>
                    #Room 1
                </div>
                <div className="flex h-10 items-center my-3  gap-5 hover:text-blue-500 text-blue-500 cursor-pointer">
                    <div className="w-1 bg-blue-500 h-10"></div>
                    #Room 1
                </div>
                <div className="flex h-10 items-center my-3  gap-5 hover:text-blue-500 text-blue-500 cursor-pointer">
                    <div className="w-1 bg-blue-500 h-10"></div>
                    #Room 1
                </div>

            </section>

            <section className="flex-auto bg-blue-300 px-5">
                {activeNavTab === "home" && <HomeSection />}
                {activeNavTab === "profile" && <ProfileSection />}
                {activeNavTab === "settings" && <SettingsSection />}
                {activeNavTab === "map" && <MapSection />}

            </section>


            <section className="min-w-[300px] mr-10 rounded-xl bg-slate-400 px-1">
                <h2 className="m-3 px-2 py-3 my-5 text-center text-lg font-bold rounded-3xl bg-white"> Suggestions For You</h2>
                <div className="flex flex-col p-3 gap-5 overflow-y-scroll max-h-[600px] w-full bg-white" style={{ scrollbarWidth: "none" }}>
                    <Followers />
                    <Followers />
                    <Followers />
                    <Followers />
                    <Followers />
                    <Followers />
                    <Followers />
                </div>

            </section>
        </div>
    );
}

export default Dashboard;
