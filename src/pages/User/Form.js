import React, { useEffect, useState } from 'react';
import icon from '../../assets/images/newlogo.png';
import { useLocation } from 'react-router-dom';
import FormData from '../../components/FormData';

export default function Form() {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');
  const [fleetNumber, setFleetNumber] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

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

    const now = new Date();
    setCurrentDate(now.toLocaleString());

    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [location]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

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
        <FormData
          userInfo={userInfo}
          fleetNumber={fleetNumber}
          token={localStorage.getItem('token')}
          userLocation={userLocation} 
        />
      </div>
    </section>
  );
}
