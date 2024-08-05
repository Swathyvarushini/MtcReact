import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';

const InspectionDetails = () => {
    const [inspectionData, setInspectionData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState({ startDate: '', endDate: '' });

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
                    setFilteredData(response.data.reverse());
                }
            } catch (error) {
                console.error('Error fetching inspection data:', error);
                alert('Error fetching inspection data');
            }
        };

        fetchInspectionData();
    }, []);

    useEffect(() => {
        const filtered = inspectionData.filter((data) => {
            const matchesSearchTerm =
                data.vehicleFleetNumberFormPojo.includes(searchTerm) ||
                data.staffNumberFormPojo.includes(searchTerm);

            const startDate = new Date(filterCriteria.startDate);
            const endDate = new Date(filterCriteria.endDate);
            const submissionDate = new Date(data.dateAndTimeOfSubmition);

            const withinDateRange =
                (!filterCriteria.startDate || submissionDate >= startDate) &&
                (!filterCriteria.endDate || submissionDate <= endDate);

            return matchesSearchTerm && withinDateRange;
        });

        setFilteredData(filtered);
    }, [searchTerm, filterCriteria, inspectionData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='user-container'>
            <div className='filter-block'>
                <div className='search-container'>
                    <input
                    type="text"
                    placeholder="Search by FleetNo or StaffId"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="search-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" /></svg>
                </div>
                
                <div className="date-filter-container">
                    <div className="date-input-container">
                        <input
                            type="date"
                            name="startDate"
                            value={filterCriteria.startDate}
                            onChange={handleFilterChange}
                            className="date-input"
                            placeholder="From"
                        />
                    </div>
                    <div className="date-input-container">
                        <input
                            type="date"
                            name="endDate"
                            value={filterCriteria.endDate}
                            onChange={handleFilterChange}
                            className="date-input"
                            placeholder="To"
                        />
                    </div>
                </div>

            </div>
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
                        {filteredData.length > 0 ? (
                            filteredData.map((data, index) => (
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
