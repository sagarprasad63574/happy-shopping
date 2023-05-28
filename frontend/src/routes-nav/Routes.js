import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage.js";
import LoginForm from "../auth/LoginForm.js";
import SignupForm from "../auth/SignupForm.js";
import PrivateRoute from "./PrivateRoute.js";
import ProductList from "../products/ProductList.js";
import Cart from "../cart/Cart.js"

// import JobList from "../jobs/JobList.js";
// import ProfileForm from "../profiles/ProfileForm.js";

function Routes({ login, signup }) {
    return (
        <div className="pt-5">
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>
                <PrivateRoute exact path="/products">
                    <ProductList />
                </PrivateRoute>
                <PrivateRoute exact path="/cart">
                    <Cart />
                </PrivateRoute>
                {/*
                <PrivateRoute exact path="/jobs">
                    <JobList />
                </PrivateRoute>

                <PrivateRoute path="/profile">
                    <ProfileForm />
                </PrivateRoute> */}
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default Routes;