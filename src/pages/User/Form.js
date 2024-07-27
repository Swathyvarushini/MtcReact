import React, { useEffect, useState } from 'react';
import RemarkForm from '../../components/RemarkForm';
import icon from '../../assets/images/newlogo.png';
import axios from 'axios';
import CONFIG from '../../Config';
import { useSelector } from 'react-redux';
import FormData from '../../components/FormData';

export default function Form() {
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
            <p>{staffNumber}</p>
            <p>{staffName}</p>
          </div>
          <p className="form__datetime">{currentDate}</p>
        </div>
        <div className='form-body'>
          <FormData fleetNumber={userInfo?.fleetNumber} />
        </div>
      </section>
    </>
  );
}
