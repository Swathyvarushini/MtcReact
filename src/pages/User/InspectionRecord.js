import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';
import Loader from '../../components/Loader';

const InspectionRecord = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  const { staffNumber } = userInfo;

  useEffect(() => {
    const fetchInspectionRecords = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${CONFIG.URL}/admins/viewForm`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data && Array.isArray(response.data)) {
          const filteredRecords = response.data.filter(record => record.staffNumberFormPojo === staffNumber);
          setRecords(filteredRecords.reverse());
        } else {
          console.error('No valid records found');
          setError('No valid records found');
        }
      } catch (error) {
        console.error('Error fetching inspection records:', error);
        setError('Error fetching inspection records');
      }
      finally {
        setLoading(false);
      }
    };

    if (staffNumber) {
      fetchInspectionRecords();
    }
  }, [staffNumber]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredRecords = selectedDate
    ? records.filter(record => {
      const recordDate = new Date(record.dateAndTimeOfSubmission).toISOString().split('T')[0];
      return recordDate === selectedDate;
    })
    : records;

  return (
    <div className="record-container">
      <h3 className="record-title">Inspection Records</h3>

      <div className="date-input-container">
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateChange}
          className='date-input'
        />
      </div>

      <div className="cards-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => {
              const recordDateTime = new Date(record.dateAndTimeOfSubmission);
              const formattedDate = recordDateTime.toLocaleDateString(); 
              const formattedTime = recordDateTime.toLocaleTimeString(); 

              return (
                <div key={index} className="record-card">
                  <div className="card-body">
                    <p><strong>Fleet No:</strong> {record.vehicleFleetNumberFormPojo}</p>
                    <p><strong>Comments:</strong> {record.additionalInfoFormPojo}</p>
                    <p><strong>Date of Submission:</strong> {formattedDate}</p>
                    <p><strong>Time of Submission:</strong> {formattedTime}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No records found for the selected date</p>
          )
        )}
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default InspectionRecord;
