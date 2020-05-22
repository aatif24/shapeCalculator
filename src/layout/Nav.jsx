import React from "react";

const App = () => {
    return (
        <nav className="navbar navbar navbar-expand-lg bg-green justify-content-center">
            <a className="navbar-brand text-center " href="/">
                <img
                    src="/images/BWLogo.png"
                    width="15%"
                    className="d-inline-block align-top"
                    alt=""
                    loading="lazy"
                />
            </a>
        </nav>
    );
};

export default React.memo(App);
