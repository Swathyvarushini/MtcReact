import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RemarkForm from './RemarkForm';

const FormData = () => {
    const location = useLocation();
    const [fleetNo, setFleetNo] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const data = params.get('data');

        if (data) {
            try {
                const decodedData = decodeURIComponent(data);
                console.log("DeCode",decodedData);
                const parsedData = JSON.parse(decodedData);
                console.log("Parse",parsedData);
                if (parsedData.fleetNo) {
                    setFleetNo(parsedData.fleetNo);
                }
            } catch (error) {
                console.error('Error decoding data:', error);
            }
        }
    }, [location]);

    console.log("location",location);
    console.log("fleet",fleetNo);
    return (
        <div>
            <h1>Form for Fleet No: {fleetNo}</h1>
            <RemarkForm/>
        </div>
    );
};

export default FormData;