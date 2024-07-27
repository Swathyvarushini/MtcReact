import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RemarkForm from './RemarkForm';

const FormData = () => {
    const location = useLocation();
    const [fleetNo, setFleetNo] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const data = params.get('data');
        console.log('Data',data);

        if (data) {
            try {
                const decodedData = decodeURIComponent(data);
                const parsedData = JSON.parse(decodedData);
                if (parsedData.fleetNo) {
                    setFleetNo(parsedData.fleetNo);
                    console.log(fleetNo);
                }
            } catch (error) {
                console.error('Error decoding data:', error);
            }
        }
    }, [location]);

    return (
        <div>
            <h1>Form for Fleet No: {fleetNo}</h1>
            <RemarkForm fleetNumber={fleetNo}/>
        </div>
    );
};

export default FormData;