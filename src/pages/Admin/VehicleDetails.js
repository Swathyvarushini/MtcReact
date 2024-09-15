import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';
import Loader from '../../components/Loader';
import Search from '../../components/Search';
import { ToastContainer, toast } from 'react-toastify';
import QRCodeGenerator from './QRCodeGenerator';

const VehicleDetails = () => {
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        fetchVehicleDetails();
    }, []);

    const fetchVehicleDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${CONFIG.URL}/admins/viewVehicles`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setVehicleDetails(response.data.reverse());
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const handleEditClick = (vehicle) => {
        setIsEditing(true);
        setCurrentVehicle(vehicle);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentVehicle({ ...currentVehicle, [name]: value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${CONFIG.URL}/update/vehicleDetails`, currentVehicle, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            fetchVehicleDetails();
            setIsEditing(false);
            setCurrentVehicle(null);
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
    };

    const handleDelete = async (vehicle) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
            setLoading(true);
            try {
                console.log("Delete Success");
                const response = await axios.post(`${CONFIG.URL}/delete/vehicleDetails`, vehicle, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response.data);
                fetchVehicleDetails();
            } catch (error) {
                console.log("Delete Unsuccessful");
                setError(error.response.data.message || 'An error occurred');
            }
            finally {
                setLoading(false);
            }
        }
    };

    const filteredVehicleDetails = vehicleDetails
        .filter(vehicle =>
            vehicle.vehicleFleetNumberPojo.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(vehicle => filterCriteria === '' || vehicle.someFilterAttribute === filterCriteria);

    return (
        <div className='user-container'>
            <div className='filters'>
                <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            </div>
            <h3 className='user-heading'>Vehicle Information</h3>
            <QRCodeGenerator />
            {error && <div className='error'>{error}</div>}
            {isEditing && currentVehicle ? (
                <div className='edit-form'>
                    <h3>Edit Vehicle Details</h3>
                    <form>
                        <div className="form-group">
                            <label>Fleet Number: </label>
                            <input
                                type="text"
                                name="vehicleFleetNumberPojo"
                                value={currentVehicle.vehicleFleetNumberPojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Service Route: </label>
                            <input
                                type="text"
                                name="vehicleServiceRoutePojo"
                                value={currentVehicle.vehicleServiceRoutePojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Model: </label>
                            <input
                                type="text"
                                name="vehicleModelPojo"
                                value={currentVehicle.vehicleModelPojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Commencement: </label>
                            <input
                                type="text"
                                name="vehicleDateOfCommencementPojo"
                                value={currentVehicle.vehicleDateOfCommencementPojo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={() => { setIsEditing(false); setCurrentVehicle(null); }}>Cancel</button>
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
                                <th>Fleet.No</th>
                                <th>Service Route</th>
                                <th>Model</th>
                                <th>Date of Commencement</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVehicleDetails.map((vehicle, index) => (
                                <tr key={vehicle.vehicleFleetNumberPojo}>
                                    <td>{index + 1}</td>
                                    <td>{vehicle.vehicleFleetNumberPojo}</td>
                                    <td>{vehicle.vehicleServiceRoutePojo || 'N/A'}</td>
                                    <td>{vehicle.vehicleModelPojo || 'N/A'}</td>
                                    <td>{formatDate(vehicle.vehicleDateOfCommencementPojo) || 'N/A'}</td>
                                    <td>
                                        <button className="btn update-btn" onClick={() => handleEditClick(vehicle)}>Update</button>
                                        <button className="btn delete-btn" onClick={() => handleDelete(vehicle)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Loader loading={loading} />
            <ToastContainer />
        </div>
    );
};

export default VehicleDetails;
