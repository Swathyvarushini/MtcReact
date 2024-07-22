import React, { useEffect, useState } from 'react';
import RemarkForm from '../../components/RemarkForm';
import icon from '../../assets/images/newlogo.png';
import axios from 'axios';
import CONFIG from '../../Config';

export default function Form() {
  const [currentDate, setCurrentDate] = useState('');
  const [username, setUsername] = useState('');
  const [fleetNumber, setFleetNumber] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch user data
    axios.get(`${CONFIG.URL}/user/profile`, {
      headers: {
        'barrer': `${token}`
      }
    }).then(response => {
      setUsername(response.data.username);
      setFleetNumber(response.data.fleetNumber);
    }).catch(error => {
      console.error('Error fetching user data:', error);
    });

    // Set current date and time
    const now = new Date();
    setCurrentDate(now.toLocaleString());

    // Update current date and time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className='container-fluid form-container'>
        <div className='form-header'>
          <img src={icon} alt="icon" className='scanner__icon' />
          <h1 className='scanner__title'>MTC-THAMBARAM</h1>
          <div className='form-details'>
            <p>Name: {username}</p>
            <p>Fleet No: {fleetNumber}</p>
            <p>Date: {currentDate}</p>
          </div>
        </div>
        <RemarkForm username={username} fleetNumber={fleetNumber} token={localStorage.getItem('token')} date={currentDate} />
      </section>
    </>
  );
}
