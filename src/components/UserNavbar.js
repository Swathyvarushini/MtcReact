import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/newlogo.png";

export const UserNavbar = () => {
  return (
    <>
        <nav className='navbar-container'>
          <div className='navbar'>
            <img src={logo} alt="mtc-logo" className='logo-image' />
            <NavLink to="/" className="logout-btn">Logout</NavLink>
          </div>
        </nav>
    </>
  )
}
