import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./routes.css";
import Cookies from "js-cookie";

import { routes } from "./routes";
import Layout from "../layout/Index";
import Loader from "../components/Loader";

/**
 * this is a router file which handles the routes and handles the appropriate page/component
 * with global layout which will render the chile component with ->
 * @param {props.children}
 * 
 * also here private and public routes are also been managed if isPrivate property is set to true
 * it will redirect to the given url (here its %BASE_URL%/login)
 */

const RouterApp = ({ a }) => {
    return (
        <div className="App h-100">
            <Router>
                <Layout>
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {routes
                                ? routes.map((v, k) => {
                                      return v.isPrivate ? (
                                          <PrivateRoute
                                              key={k}
                                              exact
                                              path={v.path}
                                              data={v}
                                              component={v.component}
                                              search={v.search}
                                          />
                                      ) : (
                                          <NonPrivateRoute
                                              key={k}
                                              data={v}
                                              exact
                                              path={v.path}
                                              component={v.component}
                                              search={v.search}
                                          />
                                      );
                                  })
                                : ""}
                            <Route component={Page404} />
                        </Switch>
                    </Suspense>
                </Layout>
            </Router>
        </div>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) =>
                Cookies.get("auth-token") ? (
                    rest.data.layout ? (
                        <Component {...props} {...rest} />
                    ) : (
                        <Component {...props} {...rest} />
                    )
                ) : (
                    <Redirect to="/login" />
                )
            }
        ></Route>
    );
};

const NonPrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            exact
            {...rest}
            render={(props) =>
                rest.data.layout ? (
                    <Component {...props} {...rest} />
                ) : (
                    <Component {...props} {...rest} />
                )
            }
        ></Route>
    );
};

const Page404 = ({ component: Component, ...rest }) => (
    <div id="notfound">
        <div className="notfound">
            <div className="notfound-404">
                <h1>
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                </h1>
            </div>
        </div>
    </div>
);
export default RouterApp;
