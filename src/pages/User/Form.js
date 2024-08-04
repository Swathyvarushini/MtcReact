import React, { useEffect, useState } from 'react';
import icon from '../../assets/images/newlogo.png';
import axios from 'axios';
import CONFIG from '../../Config';
import { useLocation } from 'react-router-dom';
import FormData from '../../components/FormData';
import { useSelector } from 'react-redux';

export default function Form() {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');
  const [username, setUsername] = useState('');
  const [fleetNumber, setFleetNumber] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dataParam = params.get('data');
    if (dataParam) {
      try {
        const decodedData = decodeURIComponent(dataParam);
        const parsedData = JSON.parse(decodedData);
        setFleetNumber(parsedData.vehicleFleetNumberPojo);
      } catch (error) {
        console.error('Error parsing data from URL:', error);
      }
    }

    const token = localStorage.getItem('token');
    axios.get(`${CONFIG.URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(response => {
      setUsername(response.data.username);
    }).catch(error => {
      console.error('Error fetching user data:', error);
    });

    const now = new Date();
    setCurrentDate(now.toLocaleString());

    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <section className='container-fluid form-container'>
      <div className='form-header'>
        <img src={icon} alt="icon" className='scanner__icon' />
        <h1 className='scanner__title'>MTC-THAMBARAM</h1>
        <div className="form__username">
          <p>{`Staff.No: ${userInfo.staffNumber}`}</p>
          <p>{`Name: ${userInfo.staffName}`}</p>
          <p>{`Fleet.No: ${fleetNumber}`}</p>
          <p className="form__datetime">{currentDate}</p>
        </div>
      </div>
      <div className='form-body'>
        <FormData username={username} fleetNumber={fleetNumber} token={localStorage.getItem('token')} date={currentDate} />
      </div>
    </section>
  );
}
