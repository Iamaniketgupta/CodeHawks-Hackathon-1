import { useSelector } from "react-redux";
import defaultavatar from "../../assets/defaultavatar.png"
const ProfileSection = () => {
    const user = useSelector((state) => state.auth.user);
    console.log(user.user.fullName)

    return (
        <div className="w-full">

<h2 className="font-bold text-center text-3xl mt-4">Profile</h2>

            {user && (
                <div className=" text-white flex-1 min-w-[300px]  my-5 p-2 mx-auto shadow-sm shadow-[#181E29] bg-[#181a1d] rounded-md">
                    <div className=" w-32 h-32 bg-white rounded-full">
                        <img src={user?.user?.avatar || defaultavatar} alt="Avatar" className="w-32 h-32 rounded-full select-none" />
                    </div>
                    <h2 className="my-4 px-3 text-xl font-bold">{user.user.fullName}</h2>
                    <div className="gap-5 p-4 px-2 ">
                        <p> {user?.user?.location ?` ${user.user?.location}` :""}</p>
                        <p>{user?.user.skillLevels ? `Skill Level: ${user.user?.skillLevels}` : ''}</p>
                    </div>
                        <p className="text-blue-500 font-semibold px-3">Sports Interests:</p>
                    <div className="flex h-fit w-full flex-wrap gap-2 p-4 px-2 items-center select-none">
                        {user.user?.sportsInterest?.map((interest, index) => (
                            <div key={index} className="px-4 py-2 bg-[#181E29] text-white rounded-3xl min-w-fit">
                                {interest}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileSection;
