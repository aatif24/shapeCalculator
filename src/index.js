import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import App from "./pages/Index";
// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//         .register("./firebase-messaging-sw.js")
//         .then(function (registration) {
//             console.log(registration);
//             console.log("Registration successful, scope is:", registration.scope);
//         })
//         .catch(function (err) {
//             console.log("Service worker registration failed, error:", err);
//         });
// }
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
