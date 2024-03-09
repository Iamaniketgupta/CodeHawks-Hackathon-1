import { useState, useEffect } from 'react';
import { socket } from '../utils/socket';
import { useParams } from 'react-router-dom';
function ChatRoom() {

    const {roomIdParam} = useParams();
  const [roomId, setRoomId] = useState('');
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Connect to the server and handle events
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('loadMessages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    // Clean up event listeners on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    socket.emit('joinRoom', roomId, userId);
  };

  const sendMessage = () => {
    socket.emit('chatMessage', roomId, userId, messageInput);
    setMessageInput('');
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        <label htmlFor="roomId">Room ID:</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}

export default ChatRoom;
