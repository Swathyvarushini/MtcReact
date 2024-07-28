import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../Config';
import { useNavigate } from 'react-router-dom';

const RemarkForm = ({ username, fleetNumber }) => {
  const [remarks, setRemarks] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setRemarks(value);
    setIsSubmitDisabled(value.length <= 5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${CONFIG.URL}/admin/FormDetails`, {
        username,
        fleetNumber,
        remarks,
        date: new Date().toISOString()
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        alert('Form submitted successfully');
        navigate("/scanner");
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className='container-fluid remark-container'>
      <h3 className='form-title'>Inspection Form</h3>
      <form onSubmit={handleSubmit} className='remark-form'>
        <label htmlFor='remarks' className='form-label'>Remarks</label>
        <textarea
          name="remarks"
          id="remark"
          className='form-textarea'
          placeholder='Enter your comments'
          value={remarks}
          onChange={handleInputChange}
        />
        <small className='info-text'>*required to be filled</small>
        <button type="submit" className='form-btn' disabled={isSubmitDisabled}>Submit</button>
      </form>
    </div>
  );
};

export default RemarkForm;
