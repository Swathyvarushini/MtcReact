import React, { useState } from 'react';
import axios from 'axios';
import CONFIG from '../../Config';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/Loader';

const VehicleRegister = () => {
    const [fleetNo, setFleetNo] = useState('');
    const [serviceRoute, setServiceRoute] = useState('');
    const [model, setModel] = useState('');
    const [doc, setDoc] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const vehicleData = {
            vehicleFleetNumberPojo: fleetNo,
            vehicleServiceRoutePojo: serviceRoute,
            vehicleModelPojo: model,
            vehicleDateOfCommencementPojo: doc,
        };
        setLoading(true);
        try {
            const response = await axios.post(`${CONFIG.URL}/admins/regVehicle`, vehicleData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setFleetNo('');
            setServiceRoute('');
            setModel('');
            setDoc('');
            toast.success('Registration Successful!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Vehicle Registration</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="fleetNo">Fleet.No</label>
                    <input
                        type="text"
                        id="fleetNo"
                        name="fleetNo"
                        placeholder="Enter Fleet No"
                        value={fleetNo}
                        onChange={(e) => setFleetNo(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="serviceRoute">Service Route</label>
                    <input
                        type="text"
                        id="serviceRoute"
                        name="serviceRoute"
                        placeholder="Enter Service Route"
                        value={serviceRoute}
                        onChange={(e) => setServiceRoute(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Enter Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="doc">Date of Commencement</label>
                    <input
                        type="date"
                        id="doc"
                        name="doc"
                        value={doc}
                        onChange={(e) => setDoc(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            <Loader loading={loading} />
            <ToastContainer />
        </div>
    );
}

export default VehicleRegister;
