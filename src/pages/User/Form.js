import React, { useEffect, useState } from 'react';
import RemarkForm from '../../components/RemarkForm';
import icon from '../../assets/images/newlogo.png';
import axios from 'axios';
import CONFIG from '../../Config';
import { useSelector } from 'react-redux';
import FormData from '../../components/FormData';
import { useLocation } from 'react-router-dom';

export default function Form() {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo);
  const {staffNumber, staffName} = userInfo;
  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleString());

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
          <div className="form__username">
            <p>Staff.No: {staffNumber}</p>
            <p>Name: {staffName}</p>
            <p>{userInfo?.fleetNumber}</p>
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
