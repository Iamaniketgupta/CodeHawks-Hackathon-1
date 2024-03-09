import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { FaLocationCrosshairs } from "react-icons/fa6";
import L from "leaflet";

const NearbyUsersMap = () => {
    // Dummy user data
    const usersData = [
        { id: 1, name: "User 1", location: { lat: 51.505, lng: -0.09 } },
        { id: 2, name: "User 2", location: { lat: 51.51, lng: -0.1 } },
    ];

    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.log("Error getting geolocation:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const calculateDistance = (user1, user2) => {
        const R = 6371;
        const dLat = (user2.lat - user1.lat) * (Math.PI / 180);
        const dLon = (user2.lng - user1.lng) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(user1.lat * (Math.PI / 180)) *
            Math.cos(user2.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    const handleFetchLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="relative">
            <span>Current location</span>
            <FaLocationCrosshairs
                onClick={handleFetchLocation}
                className="m-4 w-fit inline-block text-blue-700 cursor-pointer"
                size={30}
            />
            <MapContainer
                center={[userLocation.lat || 0, userLocation.lng || 0]}
                zoom={5}
                style={{ height: "600px", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {userLocation.lat !== null && userLocation.lng !== null && (
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                        <Popup>
                            <div>
                                <h3>Your Location</h3>
                                <p>Latitude: {userLocation.lat}</p>
                                <p>Longitude: {userLocation.lng}</p>
                            </div>
                        </Popup>
                    </Marker>
                )}
                {usersData.map((user) => {
                    const distance =
                        userLocation.lat !== null && userLocation.lng !== null
                            ? calculateDistance(userLocation, user.location).toFixed(2)
                            : '';
                    return (
                        <Marker key={user.id} position={[user.location.lat, user.location.lng]}>
                            <Popup>
                                <div>
                                    <h3>{user.name}</h3>
                                    <p>Distance: {distance} km</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default NearbyUsersMap;
