import axios, { Axios } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Register() {

    const [account, setAccount] = useState({
        name: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
    });

    const navigate = useNavigate()
    const URL = 'http://127.0.0.1:3000/accounts'

    

    const validateForm = () => {
        return account.name && account.lastName && account.username && account.password && account.email;
    };

    const handleCreateAccount = async () => {        
        if (validateForm()) {
            const {data: checkUser} = await axios.post(`${URL}/checkUsername`, account);
            console.log(checkUser);
            
            if(checkUser == "Exists"){
                alert("Username already Exists, Please choose Another Username")
                return
            }
            const result = await axios.post(URL, account);
            console.log(result);
            console.log('Account Created:', account);
            alert('user created');
            navigate('/')
            
        } else {
            alert('You need to fill in all the fields.');
        }
    };

    return (
        <>
            <h1>Create New Account:</h1>
            <br />
            <br />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', fontSize: '18px' }}>Name: </span>
                <input
                    onChange={(e) => setAccount({ ...account, name: e.target.value })}
                    style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', fontSize: '18px' }}>Last Name: </span>
                <input
                    onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
                    style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', fontSize: '18px' }}>Username: </span>
                <input
                    onChange={(e) => setAccount({ ...account, username: e.target.value })}
                    style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', fontSize: '18px' }}>Password: </span>
                <input
                    type="password"
                    onChange={(e) => setAccount({ ...account, password: e.target.value })}
                    style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ width: '120px', fontSize: '18px' }}>Email: </span>
                <input
                    type="email"
                    onChange={(e) => setAccount({ ...account, email: e.target.value })}
                    style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                />
            </div>
            <br />
            <br />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <button
                    onClick={handleCreateAccount}
                    style={{
                        flex: 1,
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                    }}
                >
                    Create Account
                </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <button
                    onClick={()=>navigate('/')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                    }}
                >
                    Back To Home Page
                </button>
            </div>
        </>
    );
}

export default Register;
