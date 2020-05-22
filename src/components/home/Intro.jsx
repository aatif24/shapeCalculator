import React from "react";

const App = () => {
    return (
        <div className="d-flex h-100 flex-column justify-content-center">
            <p className="h3 font-weight-bold mb-4">Welcome to Shape Calculator</p>
            <p className="h4 font-weight-light" style={{ lineHeight: "1.6" }}>
                Shape Calculator is an interactive web application. To the right you will find the 3
                step application. Follow the intstructions in each step . Clicking cancel will take
                you back to step 1. Enjoy!
            </p>
        </div>
    );
};

export default App;
