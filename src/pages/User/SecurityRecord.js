import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';
import Loader from '../../components/Loader';

const SecurityRecord = () => {
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
        const response = await axios.get(`${CONFIG.URL}/inspection/securityRead`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data && Array.isArray(response.data)) {
          const filteredRecords = response.data.filter(record => record.staffNumberBasePojo === staffNumber);
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
      const recordDate = new Date(record.dateAndTimeBasePojo).toISOString().split('T')[0];
      return recordDate === selectedDate;
    })
    : records;

  return (
    <div className="record-container">
      <h3 className="record-title">Security Records</h3>

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
              const recordDateTime = new Date(record.dateAndTimeBasePojo);
              const formattedDate = recordDateTime.toLocaleDateString(); 
              const formattedTime = recordDateTime.toLocaleTimeString(); 

              return (
                <div key={index} className="record-card">
                  <div className="card-body">
                    <p><span className="record-title">Fleet No:</span> {record.fleetNumberBasePojo}</p>
                    <p><span className="record-title">Body Damage:</span> {record.bodyDamagePojo}</p>
                    <p><span className="record-title">Glass Damage:</span> {record.glassesDamagePojo}</p>
                    <p><span className="record-title">Platform Damage:</span> {record.platformDamagePojo}</p>
                    <p><span className="record-title">Seat Assymbly Damage:</span> {record.seatAssyDamagePojo}</p>
                    <p><span className="record-title">Seat Cushion Damage:</span> {record.seatCushionDamagePojo}</p>
                    <p><span className="record-title">Roof Leak:</span> {record.roofLeakPojo}</p>
                    <p><span className="record-title">Inside Cleaning:</span> {record.insideCleaningPojo}</p>
                    <p><span className="record-title">Outside Cleaning:</span> {record.outsideCleaningPojo}</p>
                    <p><span className="record-title">Missing Property:</span> {record.missingPropertyPojo}</p>
                    <p><span className="record-title">Comments:</span> {record.additionalInfoBasePojo}</p>
                    <p><span className="record-title">Date of Submission:</span> {formattedDate}</p>
                    <p><span className="record-title">Time of Submission:</span> {formattedTime}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No security records found</p>
          )
        )}
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default SecurityRecord;
