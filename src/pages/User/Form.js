import React, { useEffect, useState } from 'react';
import RemarkForm from '../../components/RemarkForm';
import icon from '../../assets/images/newlogo.png';
import axios from 'axios';
import CONFIG from '../../Config';
import { useLocation } from 'react-router-dom';
import FormData from '../../components/FormData';

export default function Form() {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');
  const [username, setUsername] = useState('');
  const [fleetNumber, setFleetNumber] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fleetNumberParam = params.get('fleetNumber');
    console.log('Raw data from URL:', fleetNumberParam);
    if (fleetNumberParam) {
      setFleetNumber(decodeURIComponent(fleetNumberParam));
    }

    const token = localStorage.getItem('token');

    axios.get(`${CONFIG.URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${ token }`,
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
    <>
      <section className='container-fluid form-container'>
        <div className='form-header'>
          <img src={icon} alt="icon" className='scanner__icon' />
          <h1 className='scanner__title'>MTC-THAMBARAM</h1>
          <div className="form__username">
            <p>{username}</p>
            <p>{fleetNumber}</p>
          </div>
          <p className="form__datetime">{currentDate}</p>
        </div>
        <div className='form-body'>
          <FormData formData={formData} fleetNumber={fleetNumber} />
        </div>
      </section>
    </>
  );
}