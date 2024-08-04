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
    const [isEditing, setIsEditing] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);


    useEffect(() => {
        fetchStaffDetails();
    }, []);

    const fetchStaffDetails = async () => {
        try {
            const response = await axios.get(`${CONFIG.URL}/admins/viewStaff`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            setStaffDetails(response.data.reverse());
        } catch (error) {
            setError(error.response.data.message || 'An error occurred');
        }
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterCriteria(e.target.value);
    };

    const handleEditClick = (staff) => {
        setIsEditing(true);
        setCurrentStaff(staff);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentStaff({ ...currentStaff, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(`${CONFIG.URL}/update/staffDetails`, currentStaff, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            fetchStaffDetails();
            setIsEditing(false);
            setCurrentStaff(null);
        } catch (error) {
            setError(error.response.data.message || 'An error occurred');
        }
    };

    const handleDelete = async (staff) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            try {
                console.log("Delete Success");
                const response = await axios.post(`${CONFIG.URL}/delete/staffDetails`, staff, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                fetchStaffDetails();
            } catch (error) {
                console.log("Delete Unsuccess");
                setError(error.response.data.message || 'An error occurred');
            }
        }
    };

    const filteredStaffDetails = staffDetails
        .filter(staff =>
            staff.staffNamePojo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.staffNumberPojo.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(staff => filterCriteria === '' || staff.staffRolePojo === filterCriteria || staff.staffDesignationPojo === filterCriteria);

    return (
        <div className='user-container'>
            <div className='filter-block'>
                <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                <Filter filterCriteria={filterCriteria} handleFilterChange={handleFilterChange} />
            </div>
            <h3 className='user-heading'>Staff Information</h3>
            {error && <div className='error'>{error}</div>}
            {isEditing && currentStaff ? (
                <div className='edit-form'>
                    <h3>Edit Staff Details</h3>
                    <form>
                        <div className="form-group">
                            <label>Name: </label>
                            <input
                                type="text"
                                name="staffNamePojo"
                                value={currentStaff.staffNamePojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Designation: </label>
                            <input
                                type="text"
                                name="staffDesignationPojo"
                                value={currentStaff.staffDesignationPojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mobile Number: </label>
                            <input
                                type="text"
                                name="staffMobileNumberPojo"
                                value={currentStaff.staffMobileNumberPojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email ID: </label>
                            <input
                                type="email"
                                name="staffMailIdPojo"
                                value={currentStaff.staffMailIdPojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Role: </label>
                            <input
                                type="text"
                                name="staffRolePojo"
                                value={currentStaff.staffRolePojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Branch: </label>
                            <input
                                type="text"
                                name="staffBranchPojo"
                                value={currentStaff.staffBranchPojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={() => { setIsEditing(false); setCurrentStaff(null); }}>Cancel</button>
                            <button type="button" onClick={handleUpdate}>Save</button>
                        </div>
                    </form>
                </div>

            ) : (
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
                                    <td>{staff.staffNumberPojo || 'N/A'}</td>
                                    <td>{staff.staffNamePojo}</td>
                                    <td>{staff.staffDesignationPojo}</td>
                                    <td>{staff.staffMobileNumberPojo || 'N/A'}</td>
                                    <td>{staff.staffMailIdPojo || 'N/A'}</td>
                                    <td>{staff.staffRolePojo}</td>
                                    <td>{staff.staffBranchPojo || 'N/A'}</td>
                                    <td>
                                        <button className="btn update-btn" onClick={() => handleEditClick(staff)}>Edit</button>
                                        <button className="btn delete-btn" onClick={() => handleDelete(staff)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
