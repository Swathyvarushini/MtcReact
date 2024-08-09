import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';

const UserRegister = () => {
    const [formData, setFormData] = useState({
        staffNo: '',
        name: '',
        designation: '',
        branch:'',
        role: '',
        mobileNumber: '',
        emailId: '',
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${CONFIG.URL}/admins/StaffReg`, {
                staffNumberPojo: formData.staffNo,
                staffNamePojo: formData.name,
                staffDesignationPojo: formData.designation,
                staffBranchPojo:formData.branch,
                staffRolePojo: formData.role,
                staffMobileNumberPojo: formData.mobileNumber,
                staffMailIdPojo: formData.emailId,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data === 'Staff Registration SuccessFull') {
                setMessage(response.data);
                setFormData({
                    staffNo: '',
                    name: '',
                    designation: '',
                    branch: '',
                    role: '',
                    mobileNumber: '',
                    emailId: '',
                });
               

            } else {
                setMessage(response.data);
                
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } 
    };

    return (
        <div className="form-container">
            <h2>User Registration</h2>
            <form className="registration-form" onSubmit={handleFormSubmit}>
                <div className="input-group">
                    <label htmlFor="staffNo">Staff.No</label>
                    <input
                        type="text"
                        id="staffNo"
                        name="staffNo"
                        placeholder="Staff No"
                        value={formData.staffNo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="designation">Designation</label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        placeholder="Designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="branch">Branch</label>
                    <input
                        type="text"
                        id="branch"
                        name="branch"
                        placeholder="Branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        placeholder="Role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="emailId">Email ID</label>
                    <input
                        type="email"
                        id="emailId"
                        name="emailId"
                        placeholder="Email ID"
                        value={formData.emailId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            {message && alert(message)}
        </div>
    );
}

export default UserRegister;
