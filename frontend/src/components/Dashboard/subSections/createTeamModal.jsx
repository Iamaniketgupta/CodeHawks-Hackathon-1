import React, { useState } from 'react';
import Modal from 'react-modal';
import { createTeam } from '../../../utils/team.data.fetch.js'; // Import your team creation function

const CreateTeamModal = ({ isOpen, onClose }) => {
  const [teamDetails, setTeamDetails] = useState({
    name: 'My Team',
    description: 'A description of my team',
    category: '', // Add the category field
  });

  const category = [
    'Rugby',
    'Football',
    'Tennis',
    'Badminton',
    'Running',
    'Basketball',
    'Golf',
    'Gym Session',
    'Squash',
    'Social Event',
    'Cricket',
    'Cycling',
    'Hockey',
    'Netball',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createTeamHandler = async (e) => {
    e.preventDefault();
    const data = {
      name: teamDetails.name,
      description: teamDetails.description,
      category: teamDetails.category,
    };

    // Call your createTeam function here with the data
    const team = await createTeam(data);
    console.log(team);

    if (team) {
      onClose(); // Close the modal upon successful creation
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full  flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 ${
        isOpen ? '' : 'hidden'
      } overflow-scroll`}
    >
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-6 overflow-y-scroll">
        <button
          onClick={onClose}
          className="absolute bg-red-700 top-2 right-2 text-white hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4">Create Team</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamName">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            name="name"
            value={teamDetails.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamDescription">
            Team Description
          </label>
          <textarea
            id="teamDescription"
            name="description"
            value={teamDetails.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamCategory">
            Team Category
          </label>
          <select
            id="teamCategory"
            name="category"
            value={teamDetails.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {category.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={createTeamHandler}
        >
          Create Team
        </button>
      </div>
    </div>
  );
};

export default CreateTeamModal;
