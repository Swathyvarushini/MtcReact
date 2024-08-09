import React from 'react';
import RemarkForm from './RemarkForm';

const FormData = ({ userInfo, fleetNumber, token, userLocation }) => {
    return (
        <div>
            <RemarkForm
                userInfo={userInfo}
                fleetNumber={fleetNumber}
                token={token}
                userLocation={userLocation}
            />
        </div>
    );
};

export default FormData;
