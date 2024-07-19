import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/newlogo.png";

export const AdminNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleDropdown = (dropdown) => {
        if (openDropdown === dropdown) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(dropdown);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar')) {
                setIsMenuOpen(false);
                setOpenDropdown(null);
            }
        };

        if (isMenuOpen || openDropdown) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen, openDropdown]);

    return (
        <nav className='navbar'>
            <img src={logo} alt="mtc-logo" className='logo-image' />
            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <NavLink to="/home" className="nav-link" onClick={closeMenu}>Home</NavLink>
                <div className="dropdown">
                    <p className="dropbtn" onClick={() => handleDropdown('recordDetails')}>Record Details</p>
                    <div className={`dropdown-content ${openDropdown === 'recordDetails' ? 'show' : ''}`}>
                        <NavLink to="/user-details" className="dropdown-link" onClick={closeMenu}>User Details</NavLink>
                        <NavLink to="/vehicle-details" className="dropdown-link" onClick={closeMenu}>Vehicle Details</NavLink>
                        <NavLink to="/inspection-details" className="dropdown-link" onClick={closeMenu}>Inspection Details</NavLink>
                    </div>
                </div>
                <div className="dropdown">
                    <p className="dropbtn" onClick={() => handleDropdown('registration')}>Registration</p>
                    <div className={`dropdown-content ${openDropdown === 'registration' ? 'show' : ''}`}>
                        <NavLink to="/user-register" className="dropdown-link" onClick={closeMenu}>User Register</NavLink>
                        <NavLink to="/vehicle-register" className="dropdown-link" onClick={closeMenu}>Vehicle Register</NavLink>
                    </div>
                </div>
                <NavLink to="/logout" className="logout-btn" onClick={closeMenu}>Logout</NavLink>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z" /></svg>
            </div>
        </nav>
    );
};
