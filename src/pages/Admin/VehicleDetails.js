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

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await axios.get(`${CONFIG.URL}/admins/viewVehicles`, {
                    headers: {
                        'barrer ': `${localStorage.getItem('token')}`,
                    },
                });
                console.log("Vehicle data" ,response.data);
                setVehicleDetails(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'An error occurred');
            }
        };

        fetchVehicleDetails();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterCriteria(e.target.value);
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
                <Filter filterCriteria={filterCriteria} handleFilterChange={handleFilterChange} />
            </div>
            <h3 className='user-heading'>Vehicle Information</h3>
            {error && <div className='error'>{error}</div>}
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
                                <td>{vehicle.vehicleModalPojo || 'N/A'}</td>
                                <td>{vehicle.vehicleDateOfCommencementPojo || 'N/A'}</td>
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

export default VehicleDetails;
