import React, { useEffect, useState } from "react";
import AllTeams from "./AllTeams";
import MyTeams from "./MyTeams";
import Modal from "react-modal";
import CreateTeamModal from "./subSections/createTeamModal";

const TeamSection = () => {
  const [currTab, setCurrTab] = useState("My Teams");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const tabs = ["All Teams", "My Teams"];
  return (
    <div>
      <div>
        
          <button onClick={openModal} className="my-5 bg-blue-700">
            Create New Team
          </button>
        
        <CreateTeamModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      
      <section className="flex flex-col  sm:items-center">
        <div
          className="flex items-center  justify-between border-2 gap-2 h-14 rounded-3xl overflow-x-scroll flex-nowrap px-3"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrTab(item)}
              className={`min-w-fit bg-gradient-to-r from-bg-[#EB568E] to-bg-[#144EE3] p-2 px-4 rounded-lg text-sm font-semibold cursor-pointer ${
                currTab === item ? "text-blue-500" : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Components */}
        <div className="w-[300px] flex flex-wrap gap-2 justify-start max-md:justify-center p-2">
          {currTab === "All Teams" && <AllTeams />}
          {currTab === "My Teams" && <MyTeams />}
        </div>
      </section>
    </div>
  );
};

export default TeamSection;
