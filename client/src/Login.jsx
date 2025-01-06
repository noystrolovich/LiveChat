import Messenger from "./Messenger"
import axios from "axios"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import "./Messenger.css";

function App() {
  const [loginData, setLoginData] = useState({
    username:'',
    password:''
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const URL = 'http://127.0.0.1:3000/accounts'
  
  const loginFunc = async () => {
    const {data: resp} = await axios.post(`${URL}/login`,loginData)
    console.log(resp);
    
    switch (resp) {
      case 'valid':
        dispatch({ type: 'SET', payload: loginData.username });
        navigate('/chat')
        break;
      case 'notValid':
        alert ('Wrong Password')
        break;
      default:
        alert('User Not Exists')
        break;
    }
  }

  return (
    <>
    <h1>Log In Page:</h1>
    <br/>
    <input
        type="text"
        placeholder="Username"
        value={loginData.username}
        onChange={(e) => setLoginData({...loginData,username:e.target.value})}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "250px",
          marginBottom: "10px",
        }}
      />
      <br/>
      <input
        type="password"
        placeholder="password"
        value={loginData.password}
        onChange={(e) => setLoginData({...loginData,password:e.target.value})}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "250px",
          marginBottom: "10px",
        }}
      />
      <br/>
      <button onClick={loginFunc}>Login</button>
      <br/>
      <button onClick={()=>navigate('/register')}>Create New Account</button>
    </>
  );
}

export default App;
