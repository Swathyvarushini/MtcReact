import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../Config';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SecurityForm = ({ userInfo, fleetNumber, token, userLocation }) => {
  const questions = [
    { label: 'Body Damage', key: 'bodyDamagePojo' },
    { label: 'Glasses Damage', key: 'glassesDamagePojo' },
    { label: 'Platform Damage', key: 'platformDamagePojo' },
    { label: 'Seat Assembly Damage', key: 'seatAssyDamagePojo' },
    { label: 'Seat Cushion Damage', key: 'seatCushionDamagePojo' },
    { label: 'Roof Leakage', key: 'roofLeakPojo' },
    { label: 'Inside Cleaning', key: 'insideCleaningPojo' },
    { label: 'Outside Cleaning', key: 'outsideCleaningPojo' },
    { label: 'Missing Property', key: 'missingPropertyPojo' }
  ];

  // Initialize form data state
  const [formData, setFormData] = useState({
    bodyDamagePojo: '',
    glassesDamagePojo: '',
    platformDamagePojo: '',
    seatAssyDamagePojo: '',
    seatCushionDamagePojo: '',
    roofLeakPojo: '',
    insideCleaningPojo: '',
    outsideCleaningPojo: '',
    missingPropertyPojo: '',
  });
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  // Handle radio input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setRemarks(value);
    setIsSubmitDisabled(value.length <= 5);

    // Enable the submit button when all questions and remarks are filled
    validateForm({
      ...formData,
      [name]: value
    });
  };

  // Handle form validation
  const validateForm = (updatedFormData) => {
    const allQuestionsAnswered = Object.keys(updatedFormData).slice(0, 9).every(key => updatedFormData[key]);
    setIsSubmitDisabled(!(allQuestionsAnswered));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${CONFIG.URL}/inspection/securitySave`, {
        ...formData,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container-fluid remark-container'>
      <h3 className='form-title'>Security Form Details</h3>
      <form onSubmit={handleSubmit} className='remark-form'>

        {/* Displaying all questions with radio buttons */}
        {questions.map((question, index) => (
          <div className='questions' key={index}>
            <p className='question__title'>{question.label}</p>
            <div className='question__options'>
              <label className='question__label'>
                <input
                  type="radio"
                  name={question.key}
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData[question.key] === 'yes'}
                  className='question__option'
                />
                <span>Yes</span>
              </label>
              <label className='question__label'>
                <input
                  type="radio"
                  name={question.key}
                  value="no"
                  onChange={handleInputChange}
                  checked={formData[question.key] === 'no'}
                  className='question__option'
                />
                <span>No</span>
              </label>
            </div>
          </div>
        ))}

        {/* Remarks Textarea */}
        <div>
          <label htmlFor='remarks' className='form-label'>Remarks</label>
          <textarea
            name="remarks"
            id="remarks"
            className='form-textarea'
            placeholder='Enter your comments (minimum 5 characters)'
            value={remarks}
            onChange={handleInputChange}
          ></textarea>
          <small className='info-text'>*required to be filled</small>
        </div>


        {/* Submit Button */}
        <div className='form-btn__container'>
          <button type="submit" className='form-btn' disabled={isSubmitDisabled}>
            Submit
          </button>
        </div>

      </form>
      <Loader loading={loading} />
      <ToastContainer />
    </div>
  );
};

export default SecurityForm;
