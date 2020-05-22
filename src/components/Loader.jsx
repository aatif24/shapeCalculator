import React from "react";
import "../css/style.css";
const Loader = () => {
    return (
        <div className="h-100">
            <div className="spinner text-center d-flex justify-content-center">
                <div className="spinner-border text-secondary " role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};
export default Loader;
