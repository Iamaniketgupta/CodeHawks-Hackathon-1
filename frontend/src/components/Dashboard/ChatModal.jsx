// ChatModal.js

import React from 'react';

const ChatModal = ({ teamId, onClose  }) => {
  // Your chat room logic goes here

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 overflow-scroll">
      <div className="max-w-md w-full h-[80%] bg-black rounded-lg shadow-lg p-6 overflow-y-scroll">
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
        {/* Add your chat room UI components here */}
      </div>
    </div>
  );
};

export default ChatModal;
