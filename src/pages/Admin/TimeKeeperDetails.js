import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';
import CONFIG from '../../Config';

const TimeKeeperDetails = () => {
    const [inspectionData, setInspectionData] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState({ startDate: '', endDate: '' });

    useEffect(() => {
        const fetchInspectionData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${CONFIG.URL}/admins/viewForm`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.data) {
                    setInspectionData(response.data);
                    setFilteredData(response.data.reverse());
                }
            } catch (error) {
                console.error('Error fetching inspection data:', error);
                alert('Error fetching inspection data');
            }
            finally {
                setLoading(false);
            }
        };

        fetchInspectionData();
    }, []);

    useEffect(() => {
        const filtered = inspectionData.filter((data) => {
            const matchesSearchTerm =
                data.vehicleFleetNumberFormPojo.includes(searchTerm) ||
                data.staffNumberFormPojo.includes(searchTerm);

            const startDate = filterCriteria.startDate ? new Date(filterCriteria.startDate).setHours(0, 0, 0, 0) : null;
            const endDate = filterCriteria.endDate ? new Date(filterCriteria.endDate).setHours(23, 59, 59, 999) : null;
            const submissionDate = new Date(data.dateAndTimeOfSubmission);

            const withinDateRange =
                (!startDate || submissionDate >= startDate) &&
                (!endDate || submissionDate <= endDate);

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

    const downloadCSV = () => {
        const csvRows = [
            ['S.No', 'Fleet.No', 'Staff.No', 'Name', 'Comments', 'Date.of.Submission'],
            ...filteredData.map((data, index) => [
                index + 1,
                data.vehicleFleetNumberFormPojo,
                data.staffNumberFormPojo,
                data.staffNameFormPojo || 'NA',
                data.additionalInfoFormPojo,
                data.dateAndTimeOfSubmission,
                // data.staffLocationPojo
            ]),
        ];

        const csvContent = csvRows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "timekeeper_details.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                        <label htmlFor="startDate" style={{ fontSize: "12px" }}>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={filterCriteria.startDate}
                            onChange={handleFilterChange}
                            className="date-input"
                        />
                    </div>
                    <div className="date-input-container">
                        <label htmlFor="endDate" style={{ fontSize: "12px" }}>End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={filterCriteria.endDate}
                            onChange={handleFilterChange}
                            className="date-input"
                        />
                    </div>
                </div>
            </div>

            <h3 className='user-heading'>Time Keeper Details</h3>
            <div className="table-container">
                <button onClick={downloadCSV} className="download-btn" title="Download Report">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><linearGradient id="vscodeIconsFileTypeExcel0" x1="4.494" x2="13.832" y1="-2092.086" y2="-2075.914" gradientTransform="translate(0 2100)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#18884f" /><stop offset=".5" stop-color="#117e43" /><stop offset="1" stop-color="#0b6631" /></linearGradient></defs><path fill="#185c37" d="M19.581 15.35L8.512 13.4v14.409A1.19 1.19 0 0 0 9.705 29h19.1A1.19 1.19 0 0 0 30 27.809V22.5Z" /><path fill="#21a366" d="M19.581 3H9.705a1.19 1.19 0 0 0-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5Z" /><path fill="#107c41" d="M8.512 9.5h11.069V16H8.512Z" /><path d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2" opacity=".1" /><path d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity=".2" /><path d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity=".2" /><path d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191" opacity=".2" /><path fill="url(#vscodeIconsFileTypeExcel0)" d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.19 1.19 0 0 1 2 21.959V10.041A1.19 1.19 0 0 1 3.194 8.85" /><path fill="#fff" d="m5.7 19.873l2.511-3.884l-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017q.123-.281.26-.546l1.342-2.447h1.7l-2.359 3.84l2.419 3.905h-1.809l-1.45-2.711A2.4 2.4 0 0 1 9.2 16.8h-.024a1.7 1.7 0 0 1-.168.351l-1.493 2.722Z" /><path fill="#33c481" d="M28.806 3h-9.225v6.5H30V4.191A1.19 1.19 0 0 0 28.806 3" /><path fill="#107c41" d="M19.581 16H30v6.5H19.581Z" /></svg>
                Download Report
                </button>
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Fleet.No</th>
                            <th>Staff.No</th>
                            <th>Name</th>
                            <th>Comments</th>
                            <th>Date.of.Submission</th>
                            {/* <th>Location</th> */}
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
                                    <td>{data.dateAndTimeOfSubmission}</td>
                                    {/* <td><a href={data.staffLocationPojo} target="_blank" rel="noopener noreferrer">Click Here</a></td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Loader loading={loading} />
        </div>
    );
};

export default TimeKeeperDetails;
