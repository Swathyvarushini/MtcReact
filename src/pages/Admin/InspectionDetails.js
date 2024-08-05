import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';

const InspectionDetails = () => {
    const [inspectionData, setInspectionData] = useState([]);

    useEffect(() => {
        const fetchInspectionData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${CONFIG.URL}/admins/viewForm`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.data) {
                    setInspectionData(response.data.reverse());
                    console.log(inspectionData);
                    
                }
            } catch (error) {
                console.error('Error fetching inspection data:', error);
                alert('Error fetching inspection data');
            }
        };

        fetchInspectionData();
    }, []);

    return (
        <div className='user-container'>
            <h3 className='user-heading'>Inspection Details</h3>
            <div className="table-container">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Fleet.No</th>
                            <th>Staff.No</th>
                            <th>Name</th>
                            <th>Comments</th>
                            <th>Date.of.Submission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inspectionData.length > 0 ? (
                            inspectionData.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.vehicleFleetNumberFormPojo}</td>
                                    <td>{data.staffNumberFormPojo}</td>
                                    <td>{data.staffNameFormPojo || 'NA'}</td>
                                    <td>{data.additionalInfoFormPojo}</td>
                                    <td>{data.dateAndTimeOfSubmition}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InspectionDetails;
