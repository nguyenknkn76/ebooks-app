import React, { useState } from 'react';
import './LoginForm.scss';
import AuthService from '../../../services/AuthService';
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const authData = {
            username,
            password
        }
        const token = await AuthService.login(authData);
        console.log(token)
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
                <button onClick={handleRegister} className="register-btn">Register</button>
                <a href="#" className="forgot-password">Forgot password?</a>
            </div>
        </div>
    );
};

export default LoginForm;