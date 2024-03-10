import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../utils/user.data.fetch";
import Select from "react-select";
import InputComp from "../subcomponents/InputComp"; //ye
import { FaCameraRetro, FaLocationCrosshairs } from "react-icons/fa6";
import { login } from "../../store/authSlice";

const AUTO_COMPLETE_PLACES_API_KEY =
  "8e3aea867emsh6783f2175546b2bp1a654fjsn2b41fa6818fa"; //ye

const SettingsSection = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const dispatch = useDispatch();
  // console.log(user.user)
  // const sportsInterestOptions = [
  //     "Rugby", "Football", "Tennis", "Badminton", "Running", "Basketball", "Golf",
  //     "Gym Session", "Squash", "Social Event", "Cricket", "Cycling", "Hockey", "Netball"
  //   ];

  const [data, setData] = useState({
    fullName: "",
    age: "",
    location: "",
    lat: "",
    lon: "",
    sportsInterest:[],
    skillLevels:""
  });

  const [suggestions, setSuggestions] = useState([]); // ye

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

  const [formData, setFormData] = useState({
    fullName: user?.user?.fullName || "",
    age: user?.user?.age || "",
    sportsInterest: user?.user?.sportsInterest || [],
    location: user?.user?.location || "",
    preferredSportActivities: user?.user?.preferredSportActivities || [],
    skillLevel: user?.user?.skillLevel || "",
  });

  const handleSportsInterestChange = (selectedOptions) => {
    setData({
      ...data,
      sportsInterest: selectedOptions.map((option) => option.value),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "location") {
      fetchSuggestions(value);
    }
  };

  const fetchSuggestions = async (searchQuery) => {
    //ye
    const autoSuggestUrl = `https://map-places.p.rapidapi.com/autocomplete/json?input=${searchQuery}&radius=500000&location=india`;
    const autoSuggestOptions = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": AUTO_COMPLETE_PLACES_API_KEY,
        "X-RapidAPI-Host": "map-places.p.rapidapi.com",
      },
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
  };

  const handleSuggestionClick = (suggestion) => {
    //ye
    setData((prevData) => ({
      ...prevData,
      location: suggestion.description,
    }));
    setSuggestions([]);
  };

  const getLocation = () => {
    //ye
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setData((prevData) => ({
            ...prevData,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }));
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form Submitted:", data);
    data.coordinates = {
        latitude:data.lat,
        longitude:data.lon
    }
    const userdata = await editProfile(data);
    if (userdata) {
        console.log(userdata)
        const obj = {
          user:userdata.data
        }
        dispatch(login(obj))
        
    }
  };

  return (
    <div className="pb-[100px]">
      <h1 className="font-semibold">Settings</h1>
      <div className="text-black">
        <div className="text-3xl my-7 font-semibold text-white">Edit details </div>
        <div className="max-w-md mx-auto mt-8 p-6 bg-transparent rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">User Information</h2>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={data.fullName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={data.age}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="sportsInterest"
              className="block text-sm font-medium text-gray-600"
            >
              Sports Interest
            </label>
            <Select
              className="text-black bg-gray-600 "
              isMulti
              options={sportsOptions}
              value={sportsOptions.filter((option) =>
                data.sportsInterest.includes(option.value)
              )}
              onChange={handleSportsInterestChange}
            />
          </div>

          {/* ye */}
          <div className="flex gap-2 items-center">
            <InputComp
              type="text"
              id="location"
              name="location"
              label={"Place"}
              placeholder="Enter Place"
              onChange={handleInputChange}
              value={data.location}
            />
            <FaLocationCrosshairs
              title={"Get Coordinates"}
              onClick={getLocation}
              className="m-4 w-fit inline-block text-blue-700 cursor-pointer"
              size={30}
            />
          </div>

          {/* ye */}
          {suggestions.length > 0 && (
            <div
              className="bg-white dark:bg-[#181E29] rounded-lg shadow-md p-4 mt-4 w-[260px] max-h-28 overflow-y-auto absolute my-5 z-20"
              style={{ scrollbarWidth: "none" }}
            >
              <div>
                {suggestions.map((suggestion, index) => (
                  <p
                    key={index}
                    className="text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-500 my-3 border-spacing-2 block"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.description}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* ye */}
          <div className="flex gap-2">
            <InputComp
              type="number"
              id="lat"
              name="lat"
              label={"lat"}
              placeholder="Lat"
              onChange={handleInputChange}
              value={data.lat}
            />
            <InputComp
              type="number"
              id="lon"
              name="lon"
              label={"lon"}
              placeholder="lon"
              onChange={handleInputChange}
              value={data.lon}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="skillLevel"
              className="block text-sm font-medium text-gray-600"
            >
              Skill Level
            </label>
            <select
              id="skillLevels"
              name="skillLevels"
              value={data.skillLevel}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select Skill Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
