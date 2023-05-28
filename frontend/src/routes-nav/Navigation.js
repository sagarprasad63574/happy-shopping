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
                    <NavLink className="nav-link" to="/jobs">
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
                        Log out {currentUser.first_name || currentUser.username}
                    </Link>
                </li>
            </ul>

            // <div class="order-lg-last col-lg-5 col-sm-8 col-8">
            //     <div class="d-flex float-end">
            //         <a class="me-1 border rounded py-1 px-2 nav-link d-flex align-items-center">
            //             <i class="bi bi-box-arrow-in-right"></i>
            //             <p class="d-none d-md-block mb-0">
            //                 <NavLink className="nav-link" to="/products">
            //                     Products
            //                 </NavLink>
            //             </p>
            //         </a>
            //         <a class="me-1 border rounded py-1 px-2 nav-link d-flex align-items-center">
            //             <i class="bi bi-person-fill"></i>
            //             <p class="d-none d-md-block mb-0">
            //                 <NavLink className="nav-link" to="/profile">
            //                     Profile
            //                 </NavLink>
            //             </p>
            //         </a>
            //         <a class="me-1 border rounded py-1 px-2 nav-link d-flex align-items-center">
            //             <i class="bi bi-cart3"></i>
            //             <p class="d-none d-md-block mb-0">
            //                 <NavLink className="nav-link" to="/profile">
            //                     Profile
            //                 </NavLink>
            //             </p>
            //         </a>
            //     </div>
            // </div>

        );
    }

    function loggedOutNav() {
        return (
            // <ul className="navbar-nav ml-auto">
            //     <li className="nav-item mr-4">
            //         <NavLink className="nav-link" to="/login">
            //             Login
            //         </NavLink>
            //     </li>
            //     <li className="nav-item mr-4">
            //         <NavLink className="nav-link" to="/signup">
            //             Sign Up
            //         </NavLink>
            //     </li>
            // </ul>
            <div class="order-lg-last col-lg-5 col-sm-8 col-8">
                <div class="d-flex float-end">
                    <a class="me-1 border rounded py-1 px-2 nav-link d-flex align-items-center">
                        <i class="bi bi-box-arrow-in-right"></i>
                        <p class="d-none d-md-block mb-0">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </p>
                    </a>
                    <a class="me-1 border rounded py-1 px-2 nav-link d-flex align-items-center">
                        <i class="bi bi-person-fill"></i>
                        <p class="d-none d-md-block mb-0">
                            <NavLink className="nav-link" to="/signup">
                                Sign Up
                            </NavLink>
                        </p>
                    </a>
                    <a class="me-1 border rounded py-1 px-2 nav-link d-flex align-items-center">
                        <i class="bi bi-cart3"></i>
                        <p class="d-none d-md-block mb-0">
                            Cart
                        </p>
                    </a>
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