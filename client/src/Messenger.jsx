import "./Messenger.css";
import { io } from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'

// יצירת החיבור ל-WebSocket מחוץ לקומפוננטה
const socket = io('ws://localhost:3000', { autoConnect: false });

function Messenger() {
  const [message, setMessage] = useState(''); // שדה הודעה
  const [chat, setChat] = useState([]); // רשימת הצ'אט
  const [sessionId, setSessionId] = useState(null); // מזהה סשן
  const loginName = useSelector((state)=>state.loginName)

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log(`Connected to WebSocket with session ID: ${socket.id}, and Name: ${loginName}`);
      setSessionId(socket.id); // שמירת מזהה הסשן
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

    // שליחת ההודעה לשרת בלבד
    socket.emit('sendMessage', {sender: loginName, msg: message});

    setMessage(''); // ניקוי שדה ההודעה
  };

  return (
    <>
      <div className="app">
        <div className="chat-window">
          <div className="chat-container">
            {/* הצגת הצ'אט */}
            <div className="chat-content">
              {chat.map((m, index) => (
                <h3 key={index}>
                  <span style={{ fontWeight: 'bold' }}>{m.name}: </span>
                  {m.message}
                </h3>
              ))}
            </div>

            {/* שדה הודעה */}
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
