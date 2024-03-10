import { useEffect, useState } from "react";
import { dummyUsers } from "../../dummyData";
import Followers from "./subSections/Followers";
import ProfileSection from "./ProfileSection";
import HomeSection from "./HomeSection";
import SettingsSection from "./SettingsSection";
import MapSection from "./MapSection";
import { MdDashboard } from "react-icons/md";
import { CiUser, CiSettings } from "react-icons/ci";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getAllUsers, recommendUsers } from "../../utils/user.data.fetch";
import { RiTeamLine } from "react-icons/ri";
import TeamSection from "./TeamSection";
import { Route, Routes, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const user = useSelector((state)=>state.auth.user);
    const [userData, setUserData] = useState([]);
    const [backendLocation, setBackendLocation] = useState(user?.location || "New york");
    
    const [backendSportsInterests, setbackendSportsInterests] = useState(user?.sportsInterest || ["cricket"]);
    // console.log(user)

    // console.log(userData)

    async function allusers(){
        const data = await getAllUsers();
        if(data){
            // console.log(data)
            setUserData(data.data)
            console.log(userData)
            filterFunc();
        }
    }
    function filterFunc() {
        const filteredData = userData.filter(user => {
            const locationMatch = user.location.toLowerCase().includes(backendLocation.toLowerCase());
            const sportsInterestMatch = user.sportsInterest.some(sport => backendSportsInterests.includes(sport.toLowerCase()));
    
            console.log(`User: ${user.fullName}, Location Match: ${locationMatch}, Sports Interest Match: ${sportsInterestMatch}`);
    
            return locationMatch || sportsInterestMatch;
        });
    
        setUserData(filteredData);
    }
    
    useEffect(() => {
        allusers()
    }, [backendLocation]);
    

    const navTabs = ["home", "profile", "map", "settings" , "Teams" ];
    const [activeNavTab, setActiveNavTab] = useState(navTabs[0]);

    const handlerNavTabs = (val) => {
        setActiveNavTab(val);
    };


    return (
        <div className="relative w-screen min-h-screen flex gap-10">
            <section className="font-semibold max-md:hidden min-w-[230px] max-w-[230px] rounded-r-xl bg-gray-[#0e0001] dark:shadow-[#181E29] shadow-xl min-h-screen overflow-y-scroll overflow-x-hidden sticky top-0 left-0 z-30">
                <div className="h-14 p-5 my-2 max-sm:hidden ">
                    <p>Code Hawks</p>
                </div>
                <div className="h-[2px] bg-[#181E29] max-sm:hidden"></div>
                <div className="h-10 p-3 pl-3 text-sm max-sm:hidden text-blue-500">Account</div>
                <nav className="flex flex-col max-h-fit">
                    {navTabs.map(tab => (
                        <div key={tab} onClick={() => handlerNavTabs(tab)} className={`flex h-10 items-center my-3  gap-5 hover:text-blue-500 cursor-pointer ${activeNavTab === tab ? 'text-blue-500' : ''}`}>
                            <div className={`w-1 h-10 ${activeNavTab === tab ? 'bg-blue-500' : ''} max-sm:hidden`}></div>
                            {tab === 'home' && <MdDashboard />}
                            {tab === 'profile' && <CiUser />}
                            {tab === 'map' && <FaMapMarkedAlt />}
                            {tab === 'settings' && <CiSettings />}
                            {tab === 'Teams' && <RiTeamLine />}
                            <p className="max-sm:hidden">{tab.charAt(0).toUpperCase() + tab.slice(1)}</p>
                        </div>
                    ))}
                </nav>
            </section>
            <section className="flex-1 items-center px-5 min-w-[300px] max-w-[90%] max-md:h-[120vh] h-screen z-10">
                {activeNavTab === "home" && <HomeSection />}
                {activeNavTab === "profile" && <ProfileSection />}
                {activeNavTab === "settings" && <SettingsSection />}
                {activeNavTab === "map" && <MapSection />}
                {activeNavTab === "Teams" && <TeamSection />}
            </section>

            
            
            
            <section className="min-w-[300px] justify-self-end mr-10 rounded-xl px-1 max-md:hidden dark:shadow-[#181E29] shadow-xl">
                <h2 className="m-3 px-2 py-3 my-5 text-center text-lg font-bold rounded-3xl dark:bg-[#181E29] bg-white shadow-md"> Suggestions For You</h2>
                <div className="flex flex-col p-3 gap-5 overflow-y-scroll max-h-[600px] w-full" style={{ scrollbarWidth: "none" }}>
                    {
                        console.log(userData)
                    }
                    {userData?.map(user => (
                        <Followers key={user.id} user={user} />
                    ))}
                </div>
            </section>


            <div className="h-14 fixed w-[99.5%] bottom-0 z-40 dark:text-white dark:bg-[#181E29] bg-white md:hidden">
                <nav className="flex gap-8 text-4xl h-full items-center justify-center">
                    {navTabs.map(tab => (
                        <div key={tab} onClick={() => handlerNavTabs(tab)} className={`my-3 hover:text-blue-500 cursor-pointer ${activeNavTab === tab ? 'text-blue-500' : ''}`}>
                            {tab === 'home' && <MdDashboard />}
                            {tab === 'profile' && <CiUser />}
                            {tab === 'map' && <FaMapMarkedAlt />}
                            {tab === 'settings' && <CiSettings />}
                            {tab === 'Teams' && <RiTeamLine />}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default Dashboard;
