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
import Buttons from "../subcomponents/Buttons";
import InputComp from "../subcomponents/InputComp";

const SettingsSection = () => {
  const user = useSelector((state) => state.auth.user);
console.log(user)
  const [data, setData] = useState({
    fullName: user?.user?.user?.fullName || "",
    email:user?.user?.user?.email||"",
    sportsInterest: user?.user?.user?.sportsInterest || [],
    skillLevel:user?.user?.user?.skillLevel || "",

  });

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

  const handleSportsInterestChange = (selectedOptions) => {
    setData({
      ...data,
      sportsInterest: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
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
    <div className="pb-[100px] dark:text-white">
      <h2 className="font-bold text-center text-3xl mt-4">Settings</h2>
      <div className="text-black">
        <div className="max-w-md mx-auto mt-8 p-6 bg-transparent rounded-xl shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <InputComp
                type="text"
                id="fullName"
                name="fullName"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md dark:text-white"
                disabled
              />
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <InputComp
                type="text"
                id="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md dark:text-white"
                disabled
              />
            </div>

            <div className="mb-4">
              <label htmlFor="sportsInterest" className="block text-sm font-medium text-gray-600">
                Sports Interest
              </label>
              <Select
                isMulti
                options={sportsOptions}
                value={sportsOptions.filter((option) =>
                  data.sportsInterest.includes(option.value)
                )}
                onChange={handleSportsInterestChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-600">
                Skill Level
              </label>
              <select
                id="skillLevel"
                name="skillLevel"
                value={data.skillLevel}
                onChange={(e) => setData({ ...data, skillLevel: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md dark:text-slate-900 bg-white"
              >
                <option value="">Select Skill Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            <Buttons
              type="submit" text={"Save Details"}
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
   
          </form>

        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
