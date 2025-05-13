import "./Messenger.css";
import { io } from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'

const socket = io('ws://localhost:3000', { autoConnect: false });

function Messenger() {
  const [message, setMessage] = useState(''); 
  const [chat, setChat] = useState([]); 
  const [sessionId, setSessionId] = useState(null);
  const loginName = useSelector((state)=>state.loginName)

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Connected to WebSocket with session ID: ${socket.id}, and Name: ${loginName}`);
      setSessionId(socket.id);
    });

    socket.on('receiveMessage', (data) => {
      console.log(`Message received from ${data.name}: ${data.message}`);
      setChat((prevChat) => [...prevChat, data]);
    });

    // ניקוי מאזינים
    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') {
      alert('Please enter a message!');
      return;
    }

    socket.emit('sendMessage', {sender: loginName, msg: message});

    setMessage('');
  };

  return (
    <>
      <div className="app">
        <div className="chat-window">
          <div className="chat-container">
            <div className="chat-content">
              {chat.map((m, index) => (
                <h3 key={index}>
                  <span style={{ fontWeight: 'bold' }}>{m.name}: </span>
                  {m.message}
                </h3>
              ))}
            </div>

            <div className="message-input-container">
              <input
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="message-input"
              />
              <button onClick={sendMessage} className="send-button">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
