import React from 'react';
import RemarkForm from './RemarkForm';

const FormData = ({ userInfo, fleetNumber, token, date }) => {
    return (
        <div>
            <RemarkForm userInfo={userInfo} fleetNumber={fleetNumber} token={token} />
        </div>
    );
};

export default FormData;
