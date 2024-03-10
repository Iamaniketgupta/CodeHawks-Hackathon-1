import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getRoomByTeamId, getTextByRoomId } from '../../utils/team.data.fetch';

const ChatModal = ({teamId ,  onClose }) => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [messageInput, setMessageInput] = useState('');

  const getRoom = async()=>{
    const room  = await getRoomByTeamId(teamId);
    if(room){
        console.log(room)
        const msg = await getTextByRoomId(room.data._id);
        console.log(msg);
    }

  }

  useEffect(() => {
    getRoom();
    // Add any necessary initialization logic here
    // ...

    // Clean up any resources or subscriptions on component unmount

  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      // Add logic to handle sending messages
      // ...
      setMessageInput('');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 overflow-scroll">
      <div className="max-w-md w-full h-[80%] bg-black rounded-lg shadow-lg p-6 overflow-y-scroll text-white relative">
        <button
          onClick={onClose}
          className="absolute bg-red-700 top-4 right-4 text-white hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Chat room content */}
        <h2 className="text-xl font-semibold mb-4">Chat Room</h2>
        <div className="mb-4 max-h-60 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold">{message.user}:</span> {message.content}
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 absolute bottom-0 justify-between">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
