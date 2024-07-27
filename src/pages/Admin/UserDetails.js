import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';
import Search from '../../components/Search';
import Filter from '../../components/Filter';

const UserDetails = () => {
    const [staffDetails, setStaffDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaffDetails = async () => {
            try {
                const response = await axios.get(`${CONFIG.URL}/admins/viewStaff`, {
                    headers: {
                        'barrer ': `${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                setStaffDetails(response.data);
            } catch (error) {
                setError(error.response.data.message || 'An error occurred'); // Display a user-friendly error message
            }
        };

        fetchStaffDetails();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterCriteria(e.target.value);
    };

    const filteredStaffDetails = staffDetails
        .filter(staff =>
            staff.staffNamePojo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.staffNumberPojo.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(staff => filterCriteria === '' || staff.staffRolePojo === filterCriteria || staff.staffDesignationPojo === filterCriteria);

    return (
        <div className='user-container'>
            <div className='filters'>
                <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                <Filter filterCriteria={filterCriteria} handleFilterChange={handleFilterChange} />
            </div>
            <h3 className='user-heading'>Staff Information</h3>
            {error && <div className='error'>{error}</div>}
            <div className="table-container">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Staff.No</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Mobile Number</th>
                            <th>Email ID</th>
                            <th>Role</th>
                            <th>Branch</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaffDetails.map((staff, index) => (
                            <tr key={staff.staffNumberPojo}>
                                <td>{index + 1}</td>
                                <td>{staff.username || 'N/A'}</td>
                                <td>{staff.staffNamePojo}</td>
                                <td>{staff.staffDesignationPojo}</td>
                                <td>{staff.staffMobileNumberPojo || 'N/A'}</td>
                                <td>{staff.staffMailIdPojo || 'N/A'}</td>
                                <td>{staff.staffRolePojo}</td>
                                <td>{staff.staffBranchPojo || 'N/A'}</td>
                                <td>
                                    <button className="btn update-btn">Update</button>
                                    <button className="btn delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;
