import { useState } from 'react';
import NearbyUsersMap from './subSections/NearByUsersMap';
import { dummyUsers } from '../../dummyData';

const MapSection = () => {
    const [distance, setDistance] = useState(0);
    const [selectedSports, setSelectedSports] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(dummyUsers);

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

    const applyFilters = () => {
        const filtered = dummyUsers.filter(user => {
            const withinDistance =  calculateDistance(user.coordinates) <= distance;
            const hasSelectedSports = selectedSports.some(sport => user.sportsInterest.includes(sport));

            return withinDistance && hasSelectedSports;
        });
        setFilteredUsers(filtered);
    };

    const calculateDistance = (coordinates) => {
        const userLocation = { lat: 30.7333, lng: 76.7794 }; 
        const R = 6371;
        const dLat = (coordinates.lat - userLocation.lat) * (Math.PI / 180);
        const dLon = (coordinates.lng - userLocation.lng) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(userLocation.lat * (Math.PI / 180)) * Math.cos(coordinates.lat * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    return (
        <div className="container mx-auto p-4 ">
            <div className='flex gap-4 justify-center items-center'>
                <div className="mb-4 ">
                    <label htmlFor="distance" className="block">Distance (in meters): </label>
                    <input type="number" id="distance" value={distance === '' ? '' : distance.toString()} onChange={handleDistanceChange} className="border border-gray-400 rounded px-2 py-1" />
                </div>
                <div className="mb-4">
                    <label className="block">Select sports interests:</label>
                    <div>
                        <input type="checkbox" id="soccer" value="Soccer" onChange={handleSportsChange} className="mr-2" />
                        <label htmlFor="soccer" className="mr-4">Soccer</label>
                    </div>
                    <div>
                        <input type="checkbox" id="cricket" value="Cricket" onChange={handleSportsChange} className="mr-2" />
                        <label htmlFor="cricket">Cricket</label>
                    </div>
                </div>
                <button onClick={applyFilters} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Apply Filters</button>
            </div>
          
            <NearbyUsersMap usersData={filteredUsers} />
        </div>
    );
};

export default MapSection;
