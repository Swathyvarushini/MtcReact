import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../Config';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
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
        staffNumberBasePojo: userInfo.staffNumber,
        staffNameBasePojo: userInfo.staffName,
        fleetNumberBasePojo: fleetNumber,
        additionalInfoBasePojo: remarks,
        latitude: userLocation.lat,
        longitude: userLocation.lon
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data) {
        toast.success('Form successfully submitted', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/scanner");
      } else {
        toast.error('Form submission failed', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      <ToastContainer/>
    </div>
  );
};

export default RemarkForm;
