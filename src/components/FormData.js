import React from 'react';
import RemarkForm from './RemarkForm';

const FormData = ({ username, fleetNumber, token, date }) => {
    return (
        <div>
            <RemarkForm username={username} fleetNumber={fleetNumber} token={token} date={date} />
        </div>
    );
};

export default FormData;
