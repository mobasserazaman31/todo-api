import React, { isValidElement, useState } from 'react'
import axios from 'axios';
import { replace, useLocation, useNavigate } from 'react-router-dom';

export default function Login({login}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [username2, setUsername2] = useState('');
    const [password2, setPassword2] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname)

    const user = {
        username,
        password
    }

    const user2 = {
        username: username2,
        password: password2
    }

    const clickHandler = async (e) => {
        e.preventDefault();
        console.log('Logging in')
        const response = await axios.post("http://localhost:5000/auth/login", user, { withCredentials: true });
        login(response.data.user);
        console.log(`print response : ${response.data.user}`);
    }

    const clickHandler2 = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/auth/register", user2, { withCredentials: true });
        console.log(response.msg);

    }


    return (
        <div>
            <div><h1>TODOs</h1></div>
            <form onSubmit={clickHandler}>
                <label>Username:</label>
                <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)} required></input>
                <label>Password:</label>
                <input type='password' id='password' value={password} onChange={e => setPassword(e.target.value)} required></input>
                <button type='submit'>Login</button>
            </form>

            <form onSubmit={clickHandler2}>
                <label>Username:</label>
                <input type='text' id='username2' value={username2} onChange={e => setUsername2(e.target.value)} required></input>
                <label>Password:</label>
                <input type='password' id='password2' value={password2} onChange={e => setPassword2(e.target.value)} required></input>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}
