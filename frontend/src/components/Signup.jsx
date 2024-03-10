import { useState } from 'react';
import Buttons from './subcomponents/Buttons';
import InputComp from './subcomponents/InputComp'; //ye
import defaultavatar from "../assets/defaultavatar.png";
import { signup } from '../utils/user.data.fetch';
import { Link, useNavigate } from 'react-router-dom';
import { FaCameraRetro, FaLocationCrosshairs } from "react-icons/fa6";
import {login} from '../store/authSlice.js'
import {useDispatch} from 'react-redux'

const AUTO_COMPLETE_PLACES_API_KEY = "8e3aea867emsh6783f2175546b2bp1a654fjsn2b41fa6818fa";//ye

const Signup = () => {
    const [data, setData] = useState({
        fullName: "",
        email: '',
        password: "",
        phoneNo: "",
        gender: "",
        location: "",
        lat: "",
        lon: ""
    });
    const [suggestions, setSuggestions] = useState([]); // ye
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => { 
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'location') {
            fetchSuggestions(value);
        }
    }

    const fetchSuggestions = async (searchQuery) => { //ye
        const autoSuggestUrl = `https://map-places.p.rapidapi.com/autocomplete/json?input=${searchQuery}&radius=500000&location=india`;
        const autoSuggestOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': AUTO_COMPLETE_PLACES_API_KEY,
                'X-RapidAPI-Host': 'map-places.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(autoSuggestUrl, autoSuggestOptions);
            const result = await response.json();
            if (result && result.predictions && result.predictions.length > 0) {
                setSuggestions(result.predictions);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSuggestionClick = (suggestion) => { //ye
        setData(prevData => ({
            ...prevData,
            location: suggestion.description,
        }));
        setSuggestions([]);
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        data.coordinates = {
            latitude:data.lat,
            longitude:data.lon
        }
        const response = await signup(data);
        if (response) {
            // Handle successful signup
            console.log(response.data)
            const obj = {
                user:response.data
            }
            dispatch(login(obj))
            navigate('/api/login');
        }
    }

    const getLocation = () => { //ye
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData(prevData => ({
                        ...prevData,
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }));
                },
                (error) => {
                    console.error(error.message);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    return (
        <div className="flex justify-center items-center h-[100vh]  dark:text-inherit text-white">
            <div className="dark:text-slate-800  text-xs max-sm:w-[300px] min-h-fit h-fit py-[1.5rem] px-5 mt-48 mb-10 dark:bg-white bg-slate-800 text-white rounded-2xl">
                <h2 className="font-bold text-2xl text-center my-3 p-2">Sign Up</h2>
                <div>
                    <div className='mx-auto w-full' >
                        <p className="block pl-2 mb-1 font-semibold">Profile Image</p>
                        <div className='relative bg-white overflow-hidden rounded-full w-[100px] h-[100px] mx-auto'>
                            <img src={defaultavatar} alt="avatar" className='w-full h-full rounded-full' />
                            <label className='absolute cursor-pointer' htmlFor='avatar'><FaCameraRetro size={20} className='inline-block text-slate-500 bottom-5 left-10 absolute' /></label>
                        </div>
                        <input type="file" id="avatar" className='mx-auto text-blue-700 w-full hidden' />
                    </div>
                    <InputComp type="text" id="fullName" name="fullName" label={"Full Name"} placeholder="Enter Full Name" onChange={handleInputChange} />
                    <InputComp type="email" id="email" name="email" label={"Email"} placeholder="Enter Email" onChange={handleInputChange} />
                    <InputComp type="tel" id="phoneNo" name="phoneNo" label={"Phone"} placeholder="Enter Phone" onChange={handleInputChange} />


                    {/* ye */}
                    <div className='flex gap-2 items-center'>
                        <InputComp type="text" id="location" name="location" label={"Place"} placeholder="Enter Place" onChange={handleInputChange} value={data.location} />
                        <FaLocationCrosshairs
                            title={"Get Coordinates"}
                            onClick={getLocation}
                            className="m-4 w-fit inline-block text-blue-700 cursor-pointer"
                            size={30}
                        />
                    </div>

                    {/* ye */}
                    {suggestions.length > 0 && (
                        <div className="bg-white dark:bg-[#181E29] rounded-lg shadow-md p-4 mt-4 w-[260px] max-h-28 overflow-y-auto absolute my-5 z-20" style={{ scrollbarWidth: "none" }}>
                            <div>
                                {suggestions.map((suggestion, index) => (
                                    <p key={index} className="text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-500 my-3 border-spacing-2 block" onClick={() => handleSuggestionClick(suggestion)}>{suggestion.description}</p>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* ye */}
                    <div className='flex gap-2'>
                        <InputComp type="number" id="lat" name="lat" label={"lat"} placeholder="Lat" onChange={handleInputChange} value={data.lat} />
                        <InputComp type="number" id="lon" name="lon" label={"lon"} placeholder="lon" onChange={handleInputChange} value={data.lon} />
                    </div>

                    <InputComp type="password" id="password" name="password" label={"Password"} placeholder="Enter Password" onChange={handleInputChange} />
                </div>
                <div onClick={signupHandler}><Buttons text="Sign Up" /></div>
                <p className='text-center my-5'>Already Signed Up? <Link to={"/api/login"}>
                Login here </Link></p>
            </div>
        </div>
    );
}

export default Signup;
