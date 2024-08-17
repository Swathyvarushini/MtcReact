import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
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
    const [loading, setLoading] = useState(false); 
    const [errors, setErrors]= useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const errorsCopy = { ...errors };

        if (name === 'mobileNumber') {
            const mobileNumberPattern = /^[6-9]\d{9}$/;
            if (!mobileNumberPattern.test(value)) {
                errorsCopy.mobileNumber = 'Please enter a valid mobile number';
            } else {
                delete errorsCopy.mobileNumber;
            }
        }

        if (name === 'emailId') {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(value)) {
                errorsCopy.emailId = 'Please enter a valid email address';
            } else {
                delete errorsCopy.emailId;
            }
        }

        setErrors(errorsCopy);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                setFormData({
                    staffNo: '',
                    name: '',
                    designation: '',
                    branch: '',
                    role: '',
                    mobileNumber: '',
                    emailId: '',
                });
                toast.success('Registration Successful!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(response.data || 'Registration failed. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } 
        finally {
            setLoading(false);
        }
    }

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
                    {errors.mobileNumber && <small className="error-message">{errors.mobileNumber}</small>}
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
                    {errors.emailId && <small className="error-message">{errors.emailId}</small>}
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            <Loader loading={loading} />
            <ToastContainer />
        </div>
    );
}

export default UserRegister;
