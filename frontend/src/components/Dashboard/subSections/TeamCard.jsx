import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatModal from "../ChatModal";
import { addOneMember, removeMember } from "../../../utils/team.data.fetch";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../utils/user.data.fetch";
import { login } from "../../../store/authSlice";

const TeamCard = ({ team, myTeam = false }) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const user = useSelector((state)=>state.auth.user);
  // console.log(user)
  // console.log(team)
  const dispatch = useDispatch();

  const openChatModal = () => {
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

   const join = async () => {
    if (team) { // Check if 'team' is defined
      const addmember = await addOneMember(team._id, user._id);
      console.log(addmember);
      if (addOneMember) {

        const u = await getCurrentUser();
        if (u) {
          dispatch(login(u.data));
        }
      }
    }
  };

  const leave = async()=>{
    const removemember = await removeMember(team._id , user._id);
    console.log(removemember)
    if(removemember){
      const u = await getCurrentUser();
      if(u){
        dispatch(login(u.data));
      }
    }
  }

  return (
    <div
      
      className="bg-gray-900 shadow-md border border-gray-300  rounded-md p-4 m-4 w-64 overflow-hidden"
    >
      <h2 className="text-lg font-semibold mb-2">{team.name}</h2>
      <div className="flex items-center mb-2">
        <span className="text-white font-semibold">Category:</span>
        <span className="ml-2 text-blue-300 font-semibold">
          {team.category}
        </span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-white font-semibold">Created By:</span>
        <span className="ml-2   text-blue-300 font-semibold">
          {team.createdBy.fullName}
        </span>
      </div>
      <div className="flex items-center mb-2">
        <span className="text-white font-semibold">Number of Members:</span>
        <ul className="ml-2">{team.members.length}</ul>
      </div>
      <div className="w-full flex justify-end">
        {" "}
        {!myTeam ? (
          <button onClick={join} className="px-3 py-1 text-black font-bold bg-white">
            Join
          </button>
        ) : (
          <button onClick={leave} className="px-3 z-50
           py-1 text-white font-bold bg-red-800">
            Leave
          </button>
        )}{" "}
      </div>

      {isChatModalOpen && myTeam && (
        <ChatModal teamId={team._id} onClose={closeChatModal} />
      )}
    </div>
  );
};

export default TeamCard;
