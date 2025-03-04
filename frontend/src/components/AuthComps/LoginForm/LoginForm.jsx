import React, { useState } from 'react';
import './LoginForm.scss';
import AuthService from '../../../services/AuthService';
import {setLoggedIn} from '../../../reducers/LoggedinReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = ({onRegisterClick}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loggedin = useSelector(state => state.loggedin);
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        const authData = {
            username,
            password
        }
        const response = await AuthService.login(authData);
        window.localStorage.setItem('token', JSON.stringify(response.access_token));
        window.localStorage.setItem('user', JSON.stringify(response.user));
        dispatch(setLoggedIn(response));
        // if(loggedin?.user.role ==="admin") navigation('/admin');
        // else navigation('/');
        if(username === "admin" && password === "admin"){
            navigation('/admin');
        } else navigation("/");
    };

    const handleRegister = () => {
        console.log('Redirect to register page');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome back!</h1>
                <form onSubmit={handleLogin}>
                    <input 
                        type="username" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Your Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit" className="signin-btn">Sign in</button>
                </form>
                <button onClick={onRegisterClick} className="register-btn">Register</button>
                <a href="#" className="forgot-password">Forgot password?</a>
            </div>
        </div>
    );
};

export default LoginForm;