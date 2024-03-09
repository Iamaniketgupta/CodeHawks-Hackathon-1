import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import defaultavatar from "../../assets/defaultavatar.png";
import AllEvents from "./subSections/AllEvents";
import InputComp from "../subcomponents/InputComp";
import Followers from "./subSections/Followers";
import NearByUsers from "./subSections/NearByUsers";
import Following from "./subSections/Following";
import CreateEventModal from "./subSections/CreateEventModal";

const HomeSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currTab, setCurrTab] = useState("Events");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const tabs = ["Events", "Near By Users", "Followers", "Following"];

    return (
        <div className="w-full h-[vh]">
            <div className="flex flex-wrap-reverse min-w-[300px] items-center">
                {currTab !== "Events" && (
                    <div className="searchUsers flex min-w-[300px] max-w-[600px] flex-1 items-center my-5">
                        <CiSearch size={30} />
                        <InputComp type={"search"} id={"search"} placeholder={"Search Sports Persons"} />
                    </div>
                )}
                {/* profile section */}
                <div className="h-14 max-w-[600px] min-w-fit flex gap-3 items-center justify-end px-3 py-2 my-3">
                    <div>Aniket Gupta</div>
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

            <section>
                <div className="flex items-center justify-start border-2 gap-2 h-14 rounded-3xl overflow-x-scroll flex-nowrap px-3" style={{ scrollbarWidth: "none" }}>
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
                <div className="w-[300px] flex flex-wrap gap-2 justify-start max-md:justify-center p-2">
                    {currTab === "Events" && <AllEvents />}
                    {currTab === "Followers" && <Followers />}
                    {currTab === "Following" && <Following />}
                    {currTab === "Near By Users" && <NearByUsers />}
                </div>
            </section>
        </div>
    );
};

export default HomeSection;
