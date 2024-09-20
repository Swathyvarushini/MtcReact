import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../Config';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const RemarkForm = ({ userInfo, fleetNumber, token, userLocation, currentDate }) => {
  // Define the questions with options for dropdowns
  const questions = [
    {
      label: 'Platform Damage',
      key: 'platformPojo',
      options: [
        { value: 'Platform Hole', label: 'Platform Hole' },
        { value: 'Platform C/O', label: 'Platform C/O' },
        { value: 'Platform Structure Damage', label: 'Platform Structure Damage' }
      ]
    },
    {
      label: 'Wheel Arch Damage',
      key: 'wheelArchPojo',
      options: [
        { value: 'Good Condition', label: 'Good Condition' },
        { value: 'Front Right', label: 'Front Right' },
        { value: 'Front Left', label: 'Front Left' },
        { value: 'Rear Right', label: 'Rear Right' },
        { value: 'Rear Left', label: 'Rear Left' },
        { value: 'Both F-R Right', label: 'Both F-R Right' },
        { value: 'Both F-R Left', label: 'Both F-R Left' }
      ]
    },
    {
      label: 'Seat Cushion Damage',
      key: 'seatCushionPojo',
      options: Array.from({ length: 11 }, (_, i) => ({ value: i.toString(), label: i.toString() }))
    },
    {
      label: 'Seat Assembly Damage',
      key: 'seatAssyPojo',
      options: Array.from({ length: 11 }, (_, i) => ({ value: i.toString(), label: i.toString() }))
    },
    {
      label: 'Seat Handle Damage',
      key: 'seatHandlePojo',
      options: Array.from({ length: 11 }, (_, i) => ({ value: i.toString(), label: i.toString() }))
    },
    {
      label: 'Top Light Wire Damage',
      key: 'topLightWirePojo',
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      label: 'Foot Board Front Damage',
      key: 'footBoardFrontPojo',
      options: [
        { value: 'Good Condition', label: 'Good Condition' },
        { value: 'Bad Condition', label: 'Bad Condition' }
      ]
    },
    {
      label: 'Foot Board Rear Damage',
      key: 'footBoardRearPojo',
      options: [
        { value: 'Good Condition', label: 'Good Condition' },
        { value: 'Bad Condition', label: 'Bad Condition' }
      ]
    },
    {
      label: 'Roof Leak',
      key: 'roofLeakPojo',
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      label: 'PV Glass Damage',
      key: 'pvGlassPojo',
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
      ]
    },
    {
      label: 'Sliding Glass Damage',
      key: 'slidingGlassPojo',
      options: Array.from({ length: 11 }, (_, i) => ({ value: i.toString(), label: i.toString() }))
    }
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
    const offset = now.getTimezoneOffset() * 60000;
    const dateTime = new Date(now.getTime() - offset).toISOString().slice(0, 19);
    return dateTime;
  };

  const handleInputChange = (selectedOption, key) => {
    setFormData({
      ...formData,
      [key]: selectedOption ? selectedOption.value : ''
    });

    validateForm({
      ...formData,
      [key]: selectedOption ? selectedOption.value : ''
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
        });
        navigate("/scanner");
      } else {
        toast.error('Form submission failed', {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later', {
        position: "top-center",
        autoClose: 3000,
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
              <Select
                name={question.key}
                value={question.options.find(option => option.value === formData[question.key])}
                onChange={(selectedOption) => handleInputChange(selectedOption, question.key)}
                options={question.options}
                className='question__dropdown'
                placeholder="Select"
              />
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
