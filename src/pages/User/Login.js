import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import busImage from '../../assets/images/bus.jpg';
import icon from '../../assets/images/newlogo.png';
import axios from "axios";
import CONFIG from '../../Config';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slice/userSlice';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (value === '') {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: `${name} is required` }));
        } else {
            setErrors((prevErrors) => {
                const { [name]: removed, ...rest } = prevErrors;
                return rest;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post(`${CONFIG.URL}/admin/login`, {
                username: formData.username,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                dispatch(setUser({ user: true })); 
                navigate("/scanner");  
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (err) {
            console.error('Error:', err);
            dispatch(setUser({ user: false}));
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <section className="container-fluid login-container">
            <div className="login">
                <div className='login__image'>
                    <img src={busImage} alt="bus-image" className='login__image-img' />
                </div>
                <div className='login__content'>
                    <img src={icon} alt="icon" className='login__icon' />
                    <h1 className='login__title'>MTC-THAMBARAM</h1>
                    <small className='login__subtitle'>An app for bus inspection report</small>
                    <form method='POST' onSubmit={handleFormSubmit} className='login__form'>
                        <div className='login__input-section'>
                            <input
                                type='text'
                                name='username'
                                className="login__input"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder='Username'
                            />
                            {errors.username && <small className="login__error">{errors.username}</small>}
                        </div>
                        <div className='login__input-section'>
                            <input
                                type="password"
                                name='password'
                                className="login__input"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder='Password'
                            />
                            {errors.password && <small className="login__error">{errors.password}</small>}
                        </div>
                        <button type="submit" className='login__btn'>Login</button>
                    </form>
                    {errorMessage && <div className="login__error-message">{errorMessage}</div>}
                    <div className='login__info'>
                        <small className='login__info-text'>For forgotten passwords, contact your admin.</small>
                    </div>
                </div>
            </div>
        </section>
    );
}
