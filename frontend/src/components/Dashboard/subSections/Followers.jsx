import { useDispatch, useSelector } from "react-redux";
import Buttons from "../../subcomponents/Buttons";

import { useEffect, useState } from "react";
import { getCurrentUser, toggleFollow } from "../../../utils/user.data.fetch";
import { login } from "../../../store/authSlice";


import defaultavatar from "../../../assets/defaultavatar.png"

const Followers = ({ user }) => {
    const [followed, setfollowed] = useState(false);
    const userdata = useSelector((state)=>state.auth.user);

    const follow = async()=>{
        console.log(user)
        const data = await toggleFollow(user._id);
        updateMyProfile();
        
    }

    const dispatch = useDispatch();
    

    const updateMyProfile = async()=>{
        const data = await getCurrentUser();
        console.log(data)
        // dispatch(login())
    }

    const isFollowed = ()=>{
        if(userdata.user.user.following.includes(user._id)){
            setfollowed(true);
        }
        console.log(userdata)
        console.log(userdata.user.user.following)
    }

    useEffect(() => {
        isFollowed();
    }, [])
    

    if (!user)
        return

    return (
      
        <div className="p-4">
            <div className='flex items-center gap-2 mb-3'>
                <img src="" alt="avatar" className='w-10 h-10 rounded-full border-2' />
                <p>{user.fullName}</p>
            <div onClick={follow}><Buttons  text={followed ? "Followed" : "Follow"} className={followed ? "bg-gray-600 text-black ":null} /></div>

        <div className="p-1">
            <div className='flex items-center justify-between gap-2 '>
                <div className="flex items-center gap-3">
                <img src={defaultavatar} alt="avatar" className='w-10 h-10 rounded-full border-2' />
                <p>{user?.fullName}</p>
                </div>
            <Buttons text={"Follow"} />

            </div>
           
        </div>
    );
}

export default Followers;
