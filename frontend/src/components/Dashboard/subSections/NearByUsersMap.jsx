import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { FaLocationArrow } from "react-icons/fa";
import L from "leaflet";
import icon from "../../../assets/mapdefaultIcon.png";

const NearbyUsersMap = ({ usersData }) => {
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        setLoading(false);
                    },
                    (error) => {
                        setError("Ensure Your Internet Connection is on");
                        setLoading(false);
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
                setLoading(false);
            }
        };

        fetchUserLocation();
    }, []);

    useEffect(() => {
        setFilteredUsers(usersData);
    }, [usersData]);

    const handleFetchLocation = () => {
        setLoading(true);
        setUserLocation({ lat: null, lng: null });
        setError(null);

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLoading(false);
                },
                (error) => {
                    setError("Ensure Your Internet Connection is on");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };

    const userIcon = L.icon({
        iconUrl: icon,
        iconSize: [40, 40],
        iconAnchor: [15, 30],
    });

    const calculateDistance = (coord1, coord2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
        const dLon = (coord2.lng - coord1.lng) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coord1.lat * (Math.PI / 180)) * Math.cos(coord2.lat * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance.toFixed(2); 
    };

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
                        center={[userLocation.lat || 30.7333, userLocation.lng || 76.7794]}
                        zoom={userLocation.lat && userLocation.lng ? 12 : 2}
                        style={{ height: "500px", width: "100%", margin: "auto auto" }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {userLocation.lat !== null && userLocation.lng !== null && (
                            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                                <Popup>
                                    <div>
                                        <h3>Your Location</h3>
                                        <p>Latitude: {userLocation.lat}</p>
                                        <p>Longitude: {userLocation.lng}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                        {filteredUsers.map((user) => (
                            <Marker
                                key={user.id}
                                position={[user.coordinates.lat, user.coordinates.lng]}
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
