import React, { useState } from 'react';
import './RegisterForm.scss';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Registering:', formData);
    };

    const handleLogin = () => {
        console.log('Redirecting to login...');
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1>Create an Account</h1>
                <form onSubmit={handleRegister}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="Confirm Password" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit" className="register-btn">Register</button>
                    <button type="button" className="login-btn" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
