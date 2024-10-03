import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../Config';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const CheckerForm = ({ userInfo, fleetNumber, token, userLocation }) => {
    const directionOptions = [
        { value: 'up', label: 'Up' },
        { value: 'down', label: 'Down' }
    ];

    const regionOptions = [
        { value: 'north', label: 'North' },
        { value: 'south', label: 'South' }
    ];

    const [formData, setFormData] = useState({
        routeAndServicePojo: '',
        directionPojo: '',
        regionPojo: '',
        squadNoPojo: '',
        conductorNoPojo: '',
        passengerCountPojo: '',
        ticketLessTravelPojo: '',
        fineCollectionPojo: '',
        stagePojo: '',
        irNoPojo: '', 
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (
            (name === 'conductorNoPojo' && value.length > 6) ||
            (name === 'passengerCountPojo' && value.length > 3) ||
            (name === 'ticketLessTravelPojo' && value.length > 3) ||
            (name === 'fineCollectionPojo' && value.length > 4)
        ) {
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });

        validateForm({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (selectedOption, key) => {
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
        const requiredFields = { ...updatedFormData };
        delete requiredFields.irNoPojo; 
        const allRequiredFieldsFilled = Object.keys(requiredFields).every(key => requiredFields[key]);
        const remarksValid = updatedRemarks.length > 5;
        const irNoValid = !updatedFormData.irNoPojo || updatedFormData.irNoPojo.length >= 5;
        setIsSubmitDisabled(!(allRequiredFieldsFilled && remarksValid && irNoValid));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dateTime = getCurrentDateTime();

        try {
            const response = await axios.post(`${CONFIG.URL}/checker/saveRecord`, {
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
                navigate("/scanner");
                toast.success('Form successfully submitted', {
                    position: "top-center",
                    autoClose: 3000
                });
            } else {
                toast.error('Form submission failed', {
                    position: "top-center",
                    autoClose: 3000
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later', {
                position: "top-center",
                autoClose: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-fluid remark-container'>
            <h3 className='form-title'>Checker Form Details</h3>
            <form onSubmit={handleSubmit} className='remark-form'>

                <div className='questions'>
                    <label>Route and Service</label>
                    <input
                        type="text"
                        name="routeAndServicePojo"
                        value={formData.routeAndServicePojo}
                        onChange={handleInputChange}
                        className='form-input'
                        placeholder="Enter route and service"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>Direction</label>
                    <Select
                        options={directionOptions}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'directionPojo')}
                        value={directionOptions.find(option => option.value === formData.directionPojo)}
                        className='form-select'
                        placeholder="Select direction"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>Region</label>
                    <Select
                        options={regionOptions}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'regionPojo')}
                        value={regionOptions.find(option => option.value === formData.regionPojo)}
                        className='form-select'
                        placeholder="Select region"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>Squad No</label>
                    <input
                        type="text"
                        name="squadNoPojo"
                        value={formData.squadNoPojo}
                        onChange={handleInputChange}
                        className='form-input'
                        placeholder="Enter squad number"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>Conductor No (6 characters max)</label>
                    <input
                        type="text"
                        name="conductorNoPojo"
                        value={formData.conductorNoPojo}
                        onChange={handleInputChange}
                        className='form-input'
                        maxLength={6}
                        placeholder="Enter conductor number"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>Passenger Count (3 digits max)</label>
                    <input
                        type="number"
                        name="passengerCountPojo"
                        value={formData.passengerCountPojo}
                        onChange={handleInputChange}
                        className='form-input'
                        maxLength={3}
                        placeholder="Enter passenger count"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>Ticketless Travel (3 digits max)</label>
                    <input
                        type="number"
                        name="ticketLessTravelPojo"
                        value={formData.ticketLessTravelPojo}
                        onChange={handleInputChange}
                        className='form-input'
                        maxLength={3}
                        placeholder="Enter ticketless travel count"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>Fine Collection (4 digits max)</label>
                    <input
                        type="number"
                        name="fineCollectionPojo"
                        value={formData.fineCollectionPojo}
                        onChange={handleInputChange}
                        className='form-input'
                        maxLength={4}
                        placeholder="Enter fine collection"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>Stage</label>
                    <input
                        type="text"
                        name="stagePojo"
                        value={formData.stagePojo}
                        onChange={handleInputChange}
                        className='form-input'
                        placeholder="Enter stage"
                        required
                    />
                </div>

                <div className='questions'>
                    <label>IR No (Optional, min 5 characters if filled)</label>
                    <input
                        type="text"
                        name="irNoPojo"
                        value={formData.irNoPojo}
                        onChange={handleInputChange}
                        className='form-input'
                        placeholder="Enter IR number"
                    />
                    {formData.irNoPojo && formData.irNoPojo.length < 5 && (
                        <small className='error-text'>IR number must be at least 5 characters if filled.</small>
                    )}
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

export default CheckerForm;
