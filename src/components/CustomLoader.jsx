// Loader.js
import React from 'react';
// import './Loader.css';
import "../components/css/CustomLoader.css"

const CustomLoader = () => {
    return (
        // <div className="loading-screen">
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <div style={{textAlign: "center"}}>
                    <div className="loading-spinner"></div>
                </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
        );
};

export default CustomLoader;
