import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/newlogo.png'

const SelectRole = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (role === 'admin') {
            navigate("/home");
        } else if (role === 'user') {
            navigate("/scanner");
        }
    };

    return (
        <div className="select-role-container">
            <img src={logo} alt="mtc-logo" />
            <h1 className="title">Welcome, Admin</h1>
            <p className="subtitle">Please select your role to proceed</p>
            <div className="button-container">
                <button className="button" onClick={() => handleRoleSelection('admin')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21 16V4H3v12zm0-14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7v2h2v2H8v-2h2v-2H3a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2zM5 6h9v5H5zm10 0h4v2h-4zm4 3v5h-4V9zM5 12h4v2H5zm5 0h4v2h-4z" />
                    </svg>
                    Admin Dashboard
                </button>
                <button className="button" onClick={() => handleRoleSelection('user')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9.5 6.5v3h-3v-3zM11 5H5v6h6zm-1.5 9.5v3h-3v-3zM11 13H5v6h6zm6.5-6.5v3h-3v-3zM19 5h-6v6h6zm-6 8h1.5v1.5H13zm1.5 1.5H16V16h-1.5zM16 13h1.5v1.5H16zm-3 3h1.5v1.5H13zm1.5 1.5H16V19h-1.5zM16 16h1.5v1.5H16zm1.5-1.5H19V16h-1.5zm0 3H19V19h-1.5zM22 7h-2V4h-3V2h5zm0 15v-5h-2v3h-3v2zM2 22h5v-2H4v-3H2zM2 2v5h2V4h3V2z" />
                    </svg>
                    User View
                </button>
            </div>
        </div>
    );
};

export default SelectRole;
