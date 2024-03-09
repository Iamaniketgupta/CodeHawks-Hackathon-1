import { useState } from "react";

const ProfileSection = () => {
    const [userData, setUserData] = useState([{
        id: 1,
      fullName: 'John Doe',
      avatar: 'avatar1.jpg',
      phoneNo: '1234567890',
      email: 'john@example.com',
      password: 'password123',
      gender: 'male',
      age: 30,
      sportsInterest: ['Football', 'Basketball'],
      location: 'New York, USA',
      preferredSportActivities: ['Running', 'Swimming'],
      skillLevels: 'intermediate',
    }]);

    return (
        <div className="w-full">
            {userData.map((user) => (
                <div key={user.id} className="flex-1 min-w-[280px] mx-auto my-5 p-2 shadow-sm shadow-[#181E29] rounded-md">
                    <div className="p-3">
                        <img src={user.avatar} alt="Avatar" className="w-32 h-32 border-2 rounded-full" />
                    </div>
                    <h2 className="my-4 px-3 text-xl">{user.fullName}</h2>
                    <div className="gap-5 p-4 px-2 ">
                        <p>Lives At: {user.location}</p>
                        <p>{user.gender ? `Gender: ${user.gender}` : ''}</p>
                        <p>{user.skillLevels ? `Skill Level: ${user.skillLevels}` : ''}</p>
                    </div>
                    <div className="flex h-20 flex-wrap gap-5 p-4 px-2 items-center select-none">
                        <p className="text-blue-500">My Interests:</p>
                        {user.sportsInterest.map((interest) => (
                            <div key={interest} className="px-4 py-2 bg-[#181E29] rounded-3xl min-w-fit">
                                {interest}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProfileSection;
