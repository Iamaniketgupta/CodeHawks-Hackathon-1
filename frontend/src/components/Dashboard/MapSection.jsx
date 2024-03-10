import { useState, useEffect } from 'react';
import NearbyUsersMap from './subSections/NearByUsersMap';
import InputComp from '../subcomponents/InputComp';
import { getAllUsers } from "../../utils/user.data.fetch";
import { useSelector } from 'react-redux';

const sportsOptions = [
    { value: "Rugby", label: "Rugby" },
    { value: "Football", label: "Football" },
    { value: "Tennis", label: "Tennis" },
    { value: "Badminton", label: "Badminton" },
    { value: "Running", label: "Running" },
    { value: "Basketball", label: "Basketball" },
    { value: "Golf", label: "Golf" },
    { value: "Gym Session", label: "Gym Session" },
    { value: "Squash", label: "Squash" },
    { value: "Social Event", label: "Social Event" },
    { value: "Cricket", label: "Cricket" },
    { value: "Cycling", label: "Cycling" },
    { value: "Hockey", label: "Hockey" },
    { value: "Netball", label: "Netball" },
];

const MapSection = () => {
    const initialDistance = 50000;
    const adminUser = useSelector((state) => state.auth.user);
    const adminCoordinates = adminUser ? adminUser.user.coordinates : { latitude: 30.7333, longitude: 76.7794 };

// console.log(adminUser.user.coordinates)
// console.log(adminUser)

    const [distance, setDistance] = useState(initialDistance);
    const [selectedSports, setSelectedSports] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // Store all users' data
    const [filteredUsers, setFilteredUsers] = useState([]); // Initialize filteredUsers state

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const data = await getAllUsers();
            if (data) {
                // Update allUsers state
                const allUsersData = data.data;
                setAllUsers(allUsersData);
                // Initially set filtered users to all users
                setFilteredUsers(allUsersData);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleDistanceChange = (event) => {
        const inputValue = event.target.value;
        const newValue = inputValue === '' ? '' : parseInt(inputValue);
        setDistance(newValue);
    };

    const handleSportsChange = (event) => {
        const sport = event.target.value;
        if (selectedSports.includes(sport)) {
            setSelectedSports(selectedSports.filter(item => item !== sport));
        } else {
            setSelectedSports([...selectedSports, sport]);
        }
    };

    useEffect(() => {
        const filtered = allUsers.filter(user => {
            const withinDistance = calculateDistance(user.coordinates) <= distance;
            const hasSelectedSports = selectedSports.length === 0 || selectedSports.some(sport => user.sportsInterest.includes(sport));

            return withinDistance && hasSelectedSports;
        });

        setFilteredUsers(filtered); 
    }, [distance, selectedSports]);

    const resetFilters = () => {
        setDistance(initialDistance);
        setSelectedSports([]); 
        setFilteredUsers(allUsers);
    };

    const calculateDistance = (coordinates) => {
        if (!coordinates) return Infinity; 
        const R = 6371;
        const dLat = (coordinates.latitude - adminCoordinates.latitude) * (Math.PI / 180);
        const dLon = (coordinates.longitude - adminCoordinates.longitude) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(adminCoordinates.latitude * (Math.PI / 180)) * Math.cos(coordinates.latitude * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    };
    

    return (
        <div className="container mx-auto p-2 ">
            <div className='flex gap-2 justify-center items-center flex-wrap'>
                <div className="mb-4 min-w-[200px]">
                    <label htmlFor="distance" className="block">Distance (in kilometers): </label>
                    <InputComp type="number" id="distance" value={distance === '' ? '' : distance.toString()} onChange={handleDistanceChange} className="border border-gray-400 rounded px-2 py-1 " />
                </div>
                <div className="mb-4">
                    <label className="block">Select sports interests:</label>
                    <div className='flex items-center gap-2 max-w-[260px] min-w-[260px]  max-h-[260px] overflow-auto' style={{ scrollbarWidth: 'none' }}>
                        {sportsOptions.map((sport, index) => (
                            <div key={index}>
                                <input type="checkbox" id={sport.value} value={sport.value} onChange={handleSportsChange} className="mr-2" />
                                <label htmlFor={sport.value} className="mr-4">{sport.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={resetFilters} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Reset Filters</button>
            </div>
            <NearbyUsersMap usersData={filteredUsers} />
        </div>
    );
};

export default MapSection;
