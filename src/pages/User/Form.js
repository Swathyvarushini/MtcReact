import React, { useEffect, useState } from 'react';
import RemarkForm from '../../components/RemarkForm';
import icon from '../../assets/images/newlogo.png';
import axios from 'axios';
import CONFIG from '../../Config';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormData from '../../components/FormData';

export default function Form() {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo);
  const [username, setUsername] = useState('');
  const [fleetNumber, setFleetNumber] = useState('');
  const [formData, setFormData] = useState({});

  const { staffNumber, staffName } = userInfo;
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fleetNumberParam = params.get('fleetNumber');
    if (fleetNumberParam) {
      setFleetNumber(decodeURIComponent(fleetNumberParam));
    }

    const token = localStorage.getItem('token');

    axios.get(`${CONFIG.URL}/user/profile`, {
      headers: {
        'barrer ': `${token}`,
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

  console.log(fleetNumber);
  console.log(fleetNumber.fleetNo);

  return (
    <>
      <section className='container-fluid form-container'>
        <div className='form-header'>
          <img src={icon} alt="icon" className='scanner__icon' />
          <h1 className='scanner__title'>MTC-THAMBARAM</h1>
          <div className="form__username">
            <p>{staffNumber}</p>
            <p>{staffName}</p>
            <p>{userInfo?.fleetNo}</p>
            <p>Fleet.No:{fleetNumber}</p>
            <p>Fleet.No:{fleetNumber.fleetNo}</p>
          </div>
          <p className="form__datetime">{currentDate}</p>
        </div>
        <div className='form-body'>
          <FormData formData={formData} fleetNumber={userInfo?.fleetNumber} />
        </div>
      </section>
    </>
  );
}