// components/MessageBox.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, loadMessages } from '../actions/messages';  // Import the actions

const MessageBox = ({ receiverId }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  // Get the current user's messages from Redux state
  const messages = useSelector(state => state.messages.messages);

  useEffect(() => {
    // Load messages from Redux if any (this can be replaced with API call)
    dispatch(loadMessages([
      // Example messages, replace with actual data
      { sender: 'user1', receiver: receiverId, text: 'Hello, host!', timestamp: '2025-01-11T10:30:00Z' },
      { sender: receiverId, receiver: 'user1', text: 'Hello, how can I help?', timestamp: '2025-01-11T10:35:00Z' },
    ]));
  }, [dispatch, receiverId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Dispatch the action to send a message
      dispatch(sendMessage({
        sender: 'user1',  // Replace with actual logged-in user
        receiver: receiverId,
        text: message,
        timestamp: new Date().toISOString(),
      }));

      // Clear the message input field
      setMessage('');
    }
  };

  return (
    <div className="message-box">
      <div className="messages">
        {/* Display all messages */}
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user1' ? 'message user' : 'message host'}>
            <p>{msg.text}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>

      <div className="message-input">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageBox;
