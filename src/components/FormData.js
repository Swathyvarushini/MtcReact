import React, { useEffect, useState } from 'react';
import RemarkForm from './RemarkForm';

const FormData = ({ formData }) => {
    const [fleetNo, setFleetNo] = useState('');

    useEffect(() => {
        if (formData && formData.vehicleFleetNumberPojo) {
            setFleetNo(formData.vehicleFleetNumberPojo);
        }
    }, [formData]);

    return (
        <div>
            <h1>Form for Fleet No: {fleetNo}</h1>
            <div>
                <h2>Vehicle Details:</h2>
                <p>Fleet Number: {formData.vehicleFleetNumberPojo}</p>
                <p>Registration Number: {formData.registrationNumber}</p>
                <p>Type: {formData.type}</p>
                <p>Brand: {formData.brand}</p>
                <p>Model: {formData.model}</p>
            </div>
            <RemarkForm />
        </div>
    );
};

export default FormData;
