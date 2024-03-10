import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import defaultavatar from "../../assets/defaultavatar.png";
import AllEvents from "./subSections/AllEvents";
import InputComp from "../subcomponents/InputComp";
// import Followers from "./subSections/Followers";
import NearByUsers from "./subSections/NearByUsers";
// import Following from "./subSections/Following";
import CreateEventModal from "./subSections/CreateEventModal";
import { useSelector } from "react-redux";
import { findPeople } from "../../utils/user.data.fetch";

const HomeSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currTab, setCurrTab] = useState("Events");
    const user = useSelector((state)=>state.auth.user);
    
    const [searchUser, setsearchUser] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // const tabs = ["Events", "Near By Users", "Followers", "Following"];
    const tabs = ["Events", "Near By Users"];

    async function search(){
        if(searchUser !== ''){
            const searchData = await findPeople(searchUser);
            console.log(searchData)
        }
    }

    useEffect(() => {
        search();
        
    }, [searchUser])
    

    return (
        <div className="w-full ">
            <div className="flex flex-wrap-reverse min-w-[300px] items-center">
                {/* {currTab !== "Events" && (
                    <div className="searchUsers text-black flex min-w-[300px] max-w-[600px] flex-1 items-center my-5">
                        <CiSearch size={30} />
                        <InputComp type={"search"} id={"search"}   placeholder={"Search Sports Persons"} onChange={(e)=>setsearchUser(e.target.value)} />
                    </div>
                )} */}
                {/* profile section */}
                <div className="h-14 max-w-[600px] min-w-fit flex gap-3 items-center justify-end px-3 py-2 my-3">
                    <div>{user?.user?.fullName}</div>
                    <div>
                        <img src={defaultavatar} alt="profile" className="w-10 h-10 rounded-full" />
                    </div>
                </div>
            </div>

            {currTab !== "Events" && (
                <div className="filterusers max-w-[600px] mb-10 flex items-center justify-start gap-5 flex-wrap">
                    <div>
                        <label htmlFor="region" className="p-2 block">
                            Filter By Region
                        </label>
                        <input
                            className="block px-3 py-2 min-w-[250px] outline-offset-2 outline-blue-700 bg-white border-2 rounded-xl text-sm"
                            type={"text"}
                            id={"region"}
                            placeholder={"Enter State or City"}
                        />
                    </div>
                    <div>
                        <label htmlFor="sports" className="p-2 block">
                            Filter By Sports
                        </label>
                        <input
                            className="block px-3 py-2 min-w-[250px] outline-offset-2 outline-blue-700 bg-white border-2 rounded-xl text-sm"
                            type={"text"}
                            id={"sports"}
                            placeholder={"Enter sports"}
                        />
                    </div>
                </div>
            )}

            <div>
                {currTab === "Events" && <button onClick={openModal} className="my-5 bg-blue-700">Create New Event</button>}
                <CreateEventModal isOpen={isModalOpen} onClose={closeModal} />
            </div>

            <section className="flex flex-col  sm:items-center">
                <div className="flex items-center w-full  border-2 gap-2 h-14 rounded-3xl overflow-x-scroll flex-nowrap px-3" style={{ scrollbarWidth: "none" }}>
                    {tabs.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrTab(item)}
                            className={`min-w-fit bg-gradient-to-r from-bg-[#EB568E] to-bg-[#144EE3] p-2 px-4 rounded-lg text-sm font-semibold cursor-pointer ${currTab === item ? "text-blue-500" : ""}`}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* Components */}
                <div className=" w-full p-2 m-4 max-h-[500px] overflow-scroll">
                    {currTab === "Events" && <AllEvents />}
                    {/* {currTab === "Followers" && <Followers />}
                    {currTab === "Following" && <Following />} */}
                    {currTab === "Near By Users" && <NearByUsers />}
                </div>
            </section>
        </div>
    );
};

export default HomeSection; 
