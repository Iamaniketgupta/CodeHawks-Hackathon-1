import { useState } from 'react';

const CreateEventModal = ({ isOpen, onClose }) => {
    const [eventDetails, setEventDetails] = useState({
        eventName: 'Soccer Play Event',
        eventTime: '2:00 P.M',
        eventDate: '23-02-2023',
        eventLocation: 'Ludhiana, Punjab, Jamalpur Ground',
        eventDescription: 'Lorem ipsum dolor sit amet...',
        sports: ['Soccer', 'Football'],
        contactNumber: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSportsChange = (e) => {
        const sports = e.target.value.split(',');
        setEventDetails(prevState => ({
            ...prevState,
            sports: sports.map(sport => sport.trim())
        }));
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full  flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 ${isOpen ? '' : 'hidden'} overflow-scroll`}>
            <div className="max-w-md w-full h-[80%] bg-white rounded-lg shadow-lg p-6 overflow-y-scroll">
                <button onClick={onClose} className="absolute bg-red-700 top-20 right-20 text-white hover:text-gray-800 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold mb-4">Create Event</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">Event Name</label>
                    <input type="text" id="eventName" name="eventName" value={eventDetails.eventName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">Event Time</label>
                    <input type="text" id="eventTime" name="eventTime" value={eventDetails.eventTime} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">Event Date</label>
                    <input type="text" id="eventDate" name="eventDate" value={eventDetails.eventDate} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventLocation">Event Location</label>
                    <input type="text" id="eventLocation" name="eventLocation" value={eventDetails.eventLocation} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDescription">Event Description</label>
                    <textarea id="eventDescription" name="eventDescription" value={eventDetails.eventDescription} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sports">Sports</label>
                    <input type="text" id="sports" name="sports" value={eventDetails.sports.join(', ')} onChange={handleSportsChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">Contact Number</label>
                    <input type="text" id="contactNumber" name="contactNumber" value={eventDetails.contactNumber} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200" onClick={() => console.log(eventDetails)}>Create Event</button>
            </div>
        </div>
    );
};

export default CreateEventModal;
