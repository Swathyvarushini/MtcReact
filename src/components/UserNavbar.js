import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/newlogo.png";

export const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }

  const handleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

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
      <div className="hamburger" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z" /></svg>
      </div>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/scanner" className='nav-link' onClick={closeMenu}>Scanner</NavLink>

        <div className="dropdown">
          <p className="dropbtn" onClick={() => handleDropdown('userRecords')}>Records</p>
          <div className={`dropdown-content ${openDropdown === 'userRecords' ? 'show' : ''}`}>
            <NavLink to="/inspection-record" className='dropdown-link' onClick={closeMenu}>Inspection Record</NavLink>
            <NavLink to="/security-record" className='dropdown-link' onClick={closeMenu}>Security Record</NavLink>
            <NavLink to="/checker-record" className='dropdown-link' onClick={closeMenu}>Checker Record</NavLink>
            {/* <NavLink to="/timekeeper-record" className='dropdown-link' onClick={closeMenu}>Time Keeper Record</NavLink> */}
          </div>
          
        </div>
        
        <NavLink to="/" className="logout-btn" onClick={closeMenu}>Logout</NavLink>
      </div>
    </nav>
  );
}
