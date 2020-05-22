import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import "../css/style.css";
const App = (props) => {
    return (
        <div className="wrapper h-100">
            <Nav />
            <div className="py-5 h-100">{props.children}</div>
            <Footer />
        </div>
    );
};

export default App;
