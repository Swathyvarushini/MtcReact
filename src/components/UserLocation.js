import React, { useEffect, useState } from 'react';


const UserLocation = ({ onLocationReceived }) => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const currentLocation = {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                        };
                        setLocation(currentLocation);
                        onLocationReceived(currentLocation); 
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, [onLocationReceived]);

    return (
        <div>
            {location.lat && location.lon ? (
                <></>
            ) : (
               <>{console.log(error)}</>
            )}
        </div>
    );
};

export default UserLocation;
