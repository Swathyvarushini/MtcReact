import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';

const Record = () => {
  const [records, setRecords] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);


  const { staffNumber} = userInfo;
  console.log('Record', staffNumber);
  
  
  useEffect(() => {
    const fetchInspectionRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${CONFIG.URL}/admins/viewForm`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data) {
          setRecords(response.data);
        } else {
          console.error('No records found');
        }
      } catch (error) {
        console.error('Error fetching inspection records:', error);
      }
    };

    fetchInspectionRecords();
  }, []);
  console.log('records',records);
  

  return (
    <div className="record-container">
      <h3 className="record-title">Inspection Records</h3>
      <div className="cards-container">
        {records.length > 0 ? (
          records.map((record, index) => (
            <div key={index} className="record-card">
              <div className="card-body">
                <p><strong>Fleet No:</strong> {record.vehicleFleetNumberFormPojo}</p>
                <p><strong>Comments:</strong> {record.additionalInfoFormPojo}</p>
                <p><strong>Date and Time of Submission:</strong> {record.dateAndTimeOfSubmission}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No records found</p>
        )}
      </div>
    </div>
  );
};

export default Record;
