import React, { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/newlogo.png";

export const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    
    };
  }, [isMenuOpen]);

  return (
    <nav className='navbar'>
      <img src={logo} alt="mtc-logo" className='logo-image' />
      <div className="hamburger" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z" /></svg>
      </div>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/scanner" className='nav-link' onClick={closeMenu}>Scanner</NavLink>
        <NavLink to="/record" className='nav-link' onClick={closeMenu}>Record</NavLink>
        <NavLink to="/" className="logout-btn" onClick={closeMenu}>Logout</NavLink>
      </div>
    </nav>
  )
}
