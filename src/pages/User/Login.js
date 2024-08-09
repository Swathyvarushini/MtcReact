import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CONFIG from '../../Config';
import busImage from '../../assets/images/bus.jpg';
import icon from '../../assets/images/newlogo.png';
import Loader from '../../components/Loader';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

        setLoading(true);  

        try {
            const response = await axios.post(`${CONFIG.URL}/admin/login`, {
                staffNumberPojo: formData.username,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userInfo', JSON.stringify(response.data)); 

                if (response.data.role === 'admin') {
                    navigate("/select-role");
                } else {
                    navigate("/scanner");
                }
            } else {
                setErrorMessage(response.data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false); 
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
                                type={showPassword ? "text" : "password"}
                                name='password'
                                className="login__input"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder='Password'
                            />
                            <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0" /></svg>
                                ) : (
                                        <svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24"><path fill = "currentColor" d = "M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13" /></svg>
                                )}
                            </span>
                            {errors.password && <small className="login__error">{errors.password}</small>}
                        </div>

                        <button type="submit" className='login__btn' disabled={loading}>Login</button>
                    </form>
                    {errorMessage && <div className="login__error-message">{errorMessage}</div>}
                    <div className='login__info'>
                        <small className='login__info-text'>For forgotten passwords, contact your admin.</small>
                    </div>
                </div>
            </div>
            <Loader loading={loading}/>
        </section>
    );
}
