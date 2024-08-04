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
            <RemarkForm />
        </div>
    );
};

export default FormData;
