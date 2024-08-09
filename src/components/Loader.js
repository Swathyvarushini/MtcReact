import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";

const Loader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="full-page-loader">
            <div className="loader-content">
                <BeatLoader
                    color="#1f2937"
                    loading={loading}
                    size={15}
                    speedMultiplier={1}
                />
            </div>
        </div>
    );
};

export default Loader;
