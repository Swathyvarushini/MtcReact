import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';
import Search from '../../components/Search';
import Filter from '../../components/Filter';

const VehicleDetails = () => {
    const [vehicleDetails, setVehicleDetails] = useState([]);
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
        try {
            const response = await axios.get(`${CONFIG.URL}/admins/viewVehicles`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log("Vehicle data", response.data);
            setVehicleDetails(response.data.reverse());
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
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
        try {
            const response = await axios.post(`${CONFIG.URL}/update/vehicleDetails`, currentVehicle, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            fetchVehicleDetails();
            setIsEditing(false);
            setCurrentVehicle(null);
        } catch (error) {
            setError(error.response.data.message || 'An error occurred');
        }
    };

    const handleDelete = async (vehicle) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
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
        </div>
    );
};

export default VehicleDetails;
