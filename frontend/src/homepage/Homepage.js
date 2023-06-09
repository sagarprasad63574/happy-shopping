import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext.js";
import "./Homepage.css";

function Homepage() {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Happy Shopping</h1>
                <p className="lead">Convenient place for shopping.</p>
                {currentUser
                    ?
                    <h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                        <div>
                            <Link className="btn btn-primary font-weight-bold"
                                to="/products">
                                SHOP
                            </Link>
                        </div>
                    </h2>
                    : (
                        <p>
                            <Link className="btn btn-primary font-weight-bold mr-3"
                                to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-primary font-weight-bold"
                                to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    );
}

export default Homepage;