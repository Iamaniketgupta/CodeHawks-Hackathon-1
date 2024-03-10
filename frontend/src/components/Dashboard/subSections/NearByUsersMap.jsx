import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { FaLocationArrow } from "react-icons/fa";
import L from "leaflet";
import icon from "../../../assets/mapdefaultIcon.png";
import { useSelector } from "react-redux";

const NearbyUsersMap = ({ usersData }) => {
    const adminUser = useSelector((state) => state.auth.user);
    const adminCoordinates = adminUser ? adminUser.user.coordinates : { latitude: 30.7333, longitude: 76.7794 };

    const [userLocation, setUserLocation] = useState(adminCoordinates);
    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setLoading(false);
                },
                (error) => {
                    setError("Error fetching user location. Please ensure your internet connection is on.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserLocation();
    }, []);

    useEffect(() => {
        setFilteredUsers(usersData);
    }, [usersData]);

    const handleFetchLocation = () => {
        setLoading(true);
        setUserLocation({ latitude: null, longitude: null });
        setError(null);

        fetchUserLocation();
    };

    const userIcon = L.icon({
        iconUrl: icon,
        iconSize: [40, 40],
        iconAnchor: [15, 30],
    });

    const calculateDistance = (coord1, coord2) => {
        const R = 6371; 
        const lat1 = parseFloat(coord1.latitude);
        const lon1 = parseFloat(coord1.longitude);
        const lat2 = parseFloat(coord2.latitude);
        const lon2 = parseFloat(coord2.longitude);
    
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance.toFixed(2);
    };
    
console.log(filteredUsers)
    return (
        <div className="relative">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && (
                <div>
                    <span>Current location</span>
                    <FaLocationArrow
                        onClick={handleFetchLocation}
                        className="m-4 w-fit inline-block text-blue-500 cursor-pointer"
                        size={25}
                    />
                    <MapContainer
                        center={[userLocation.latitude || 30.7333, userLocation.longitude || 76.7794]}
                        zoom={userLocation.latitude && userLocation.longitude ? 12 : 2}
                        style={{ height: "500px", width: "100%", margin: "auto auto" }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {userLocation.latitude !== null && userLocation.longitude !== null && (
                            <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
                                <Popup>
                                    <div>
                                        <h3>Your Location</h3>
                                        <p>Latitude: {userLocation.latitude}</p>
                                        <p>Longitude: {userLocation.longitude}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                        {filteredUsers.map((user, index) => (
                            <Marker
                                key={index}
                                position={[parseFloat(user.coordinates.latitude), parseFloat(user.coordinates.longitude)]}
                            >
                                <Popup>
                                    <div>
                                        <h3>{user.fullName}</h3>
                                        <p>Location: {user.location}</p>
                                        <p>Distance: {calculateDistance(userLocation, user.coordinates)} km</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            )}
        </div>
    );
};

export default NearbyUsersMap;
