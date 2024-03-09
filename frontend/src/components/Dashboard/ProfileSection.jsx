

const ProfileSection = () => {
    return (
        <div className="w-full ">
            <div className="flex-1 min-w-[280px] mx-auto my-5 p-2 shadow-sm shadow-[#181E29] rounded-md">
                <div className="p-3">
                    <img src="" alt="AVaTAr" className="w-32 h-32 border-2 rounded-full" />
                </div>
                <h2 className="my-4 px-3 text-xl">Aniket Gupta</h2>

                <div className="gap-5 p-4 px-2 ">
                    <p>Lives At : Ludhiana, Punjab, India</p>
                    <p >Gender : Male</p>
                </div>

                <div className="flex h-20 flex-wrap gap-5 p-4 px-2 items-center select-none">
                    <p className="text-blue-500"> My Interests:</p>
                    <div className="px-4 py-2 bg-[#181E29] rounded-3xl min-w-fit">
                        Cricket
                    </div>
                    <div className="px-4 py-2 bg-[#181E29] rounded-3xl min-w-fit">
                        Soccer
                    </div>
                    <div className="px-4 py-2 bg-[#181E29] rounded-3xl min-w-fit">
                        Hockey
                    </div>
                    <div className="px-4 py-2 bg-[#181E29] rounded-3xl min-w-fit">
                        Cricket
                    </div>
                </div>


            </div>


        </div>
    );
}

export default ProfileSection;
