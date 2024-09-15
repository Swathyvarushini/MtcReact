import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../Config';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RemarkForm = ({ userInfo, fleetNumber, token, userLocation, currentDate }) => {
  const questions = [
    { label: 'Platform Damage', key: 'platformPojo' },
    { label: 'Wheel Arch Damage', key: 'wheelArchPojo' },
    { label: 'Seat Cushion Damage', key: 'seatCushionPojo' },
    { label: 'Seat Assembly Damage', key: 'seatAssyPojo' },
    { label: 'Seat Handle Damage', key: 'seatHandlePojo' },
    { label: 'Top Light Wire Damage', key: 'topLightWirePojo' },
    { label: 'Foot Board Front Damage', key: 'footBoardFrontPojo' },
    { label: 'Foot Board Rear Damage', key: 'footBoardRearPojo' },
    { label: 'Roof Leak', key: 'roofLeakPojo' },
    { label: 'PV Glass Damage', key: 'pvGlassPojo' },
    { label: 'Sliding Glass Damage', key: 'slidingGlassPojo' }
  ];

  const [formData, setFormData] = useState({
    platformPojo: '',
    wheelArchPojo: '',
    seatCushionPojo: '',
    seatAssyPojo: '',
    seatHandlePojo: '',
    topLightWirePojo: '',
    footBoardFrontPojo: '',
    footBoardRearPojo: '',
    roofLeakPojo: '',
    pvGlassPojo: '',
    slidingGlassPojo: '',
  });

  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
    const dateTime = new Date(now.getTime() - offset).toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
    console.log(dateTime);
    return dateTime;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    validateForm({
      ...formData,
      [name]: value
    });
  };

  const handleRemarksChange = (e) => {
    const value = e.target.value;
    setRemarks(value);
    validateForm(formData, value);
  };

  const validateForm = (updatedFormData, updatedRemarks = remarks) => {
    const allQuestionsAnswered = Object.keys(updatedFormData).every(key => updatedFormData[key]);
    const remarksValid = updatedRemarks.length > 5;
    setIsSubmitDisabled(!(allQuestionsAnswered && remarksValid));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dateTime = getCurrentDateTime();

    try {
      const response = await axios.post(`${CONFIG.URL}/inspection/supervisor/saveRecord`, {
        ...formData,
        staffNumberBasePojo: userInfo.staffNumber,
        staffNameBasePojo: userInfo.staffName,
        fleetNumberBasePojo: fleetNumber,
        additionalInfoBasePojo: remarks,
        latitude: userLocation.lat,
        longitude: userLocation.lon,
        dateAndTimeBasePojo: dateTime,
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
      <h3 className='form-title'>Inspection Form Details</h3>
      <form onSubmit={handleSubmit} className='remark-form'>
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

        <div>
          <label htmlFor='remarks' className='form-label'>Remarks</label>
          <textarea
            name="remarks"
            id="remarks"
            className='form-textarea'
            placeholder='Enter your comments (minimum 5 characters)'
            value={remarks}
            onChange={handleRemarksChange}
          ></textarea>
          <small className='info-text'>*required to be filled</small>
        </div>

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

export default RemarkForm;
