import React, { useEffect, useState } from 'react';
import icon from '../../assets/images/newlogo.png';
import { useSelector } from 'react-redux';
import FormData from '../../components/FormData';

export default function Form() {
  const [currentDate, setCurrentDate] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo);

  console.log(userInfo);
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
            <p>{userInfo?.username}</p>
            <p>{userInfo?.fleetNumber}</p>
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
