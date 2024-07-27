import React from 'react';
import RemarkForm from './RemarkForm';

const FormData = ({ fleetNumber }) => {
    return (
        <div>
            <RemarkForm fleetNumber={fleetNumber} />
        </div>
    );
};

export default FormData;
