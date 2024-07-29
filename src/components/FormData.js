import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RemarkForm from './RemarkForm';

const FormData = () => {
    const location = useLocation();
    const [fleetNo, setFleetNo] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const data = params.get('data');
        console.log('Raw data from URL:', data);
        if (data) {
            try {
                const decodedData = decodeURIComponent(data);
                console.log('Decoded data:', decodedData);
                const parsedData = JSON.parse(decodedData);
                console.log('Parsed data:', parsedData);
                if (parsedData.fleetNo) {
                    setFleetNo(parsedData.fleetNo);
                }
            } catch (error) {
                console.error('Error decoding data:', error);
            }
        }
    }, [location]);

    return (
        <div>
            <h1>Form for Fleet No: {fleetNo}</h1>
            <RemarkForm />
        </div>
    );
};

export default FormData;