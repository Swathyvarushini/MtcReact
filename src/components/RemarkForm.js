import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../Config';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const RemarkForm = ({ userInfo, fleetNumber, token, userLocation }) => {
  const [remarks, setRemarks] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setRemarks(value);
    setIsSubmitDisabled(value.length <= 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${CONFIG.URL}/admins/regForm`, {
        staffNumberFormPojo: userInfo.staffNumber,
        staffNameFormPojo: userInfo.staffName,
        vehicleFleetNumberFormPojo: fleetNumber,
        additionalInfoFormPojo: remarks,
        latitude: userLocation.lat,
        longitude: userLocation.lon
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data) {
        alert(response.data);
        navigate("/scanner");
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className='container-fluid remark-container'>
      <h3 className='form-title'>Inspection Form</h3>
      <form onSubmit={handleSubmit} className='remark-form'>
        <label htmlFor='remarks' className='form-label'>Remarks</label>
        <textarea
          name="remarks"
          id="remarks"
          className='form-textarea'
          placeholder='Enter your comments'
          value={remarks}
          onChange={handleInputChange}
        ></textarea>
        <small className='info-text'>*required to be filled</small>
        <button type="submit" className='form-btn' disabled={isSubmitDisabled}>Submit</button>
      </form>
      <Loader loading={loading} />
    </div>
  );
};

export default RemarkForm;
