import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext.js";
import "./Navigation.css";

function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-2">
                    <NavLink className="nav-link" to="/products">
                        Shop
                    </NavLink>
                </li>
                <li className="nav-item mr-2">
                    <NavLink className="nav-link" to="/cart">
                    <i className="bi bi-cart3 mr-2"></i>
                        Cart
                    </NavLink>
                </li>
                <li className="nav-item mr-2">
                    <NavLink className="nav-link" to="/favorites">
                    <i className="bi bi-heart mr-2"></i>
                        Favorites
                    </NavLink>
                </li>
                <li className="nav-item mr-2">
                    <NavLink className="nav-link" to="/profile">
                    <i className="bi bi-person-fill mr-2"></i>
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/" onClick={logout}>
                        Log out {currentUser.firstName || currentUser.username}
                    </Link>
                </li>
            </ul>
        );
    }

    function loggedOutNav() {
        return (
            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                <div className="d-flex float-end">
                    <div className="nav-link me-1 border rounded py-1 px-2 nav-link d-flex align-items-center">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <p className="d-none d-md-block mb-0">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </p>
                    </div>
                    <div className="me-1 border rounded py-1 px-2 nav-link d-flex align-items-center">
                        <i className="bi bi-person-fill"></i>
                        <p className="d-none d-md-block mb-0">
                            <NavLink className="nav-link" to="/signup">
                                Sign Up
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/">
                Happy Shopping
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}

export default Navigation;