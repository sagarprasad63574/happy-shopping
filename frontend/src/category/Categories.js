
import React, { useState, useEffect } from "react";
function Categories({ searchCategory }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        searchCategory(evt.target.getAttribute('value') || undefined);
    }

    return (
        <nav className="row gy-4">
            <div className="col-lg-6 col-md-12">
                <div className="row">
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="smartphones"
                            >
                                <i className="fas fa-mobile-alt fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Smartphones</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="laptops"
                            >
                                <i className="fas fa-laptop fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Laptops</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="fragrances"
                            >
                                <i className="fas fa-flask fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Fragrances</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="skincare"
                            >
                                <i className="fas fa-spa fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Skincare</div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="row">
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="groceries"
                            >
                                <i className="fas fa-apple-alt fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Groceries</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="home-decoration"
                            >
                                <i className="fas fa-house-user fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Home Decoration</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="furniture"
                            >
                                <i className="fas fa-chair fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Furniture</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="tops"
                            >
                                <i className="fas fa-tshirt fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Tops</div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="row">
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="womens-dresses"
                            >
                                <i className="fas fa-person-dress fa-xl fa-fw" 
                                    style={{ pointerEvents: "none"}}></i>
                            </button>
                            <div className="text-dark">Womens Dresses</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="womens-shoes"
                            >
                                <i className="fas fa-shoe-prints fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Womens Shoes</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="mens-shirts"
                            >
                                <i className="fas fa-tshirt fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Mens Shirts</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="mens-shoes"
                            >
                                <i className="fas fa-shoe-prints fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Mens Shoes</div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="row">
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="mens-watches"
                            >
                                <i className="bi bi-watch fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Mens Watches</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="womens-watches"
                            >
                                <i className="bi bi-watch fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Womens Watches</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="womens-bags"
                            >
                                <i className="fas fa-shopping-bag fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Womens Bags</div>
                        </span>
                    </div>
                    <div className="col-3">
                        <span className="text-center d-flex flex-column justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-secondary mx-auto p-3 mb-2"
                                data-mdb-ripple-color="dark"
                                onClick={handleSubmit}
                                value="womens-jewellery"
                            >
                                <i className="fas fa-gem fa-xl fa-fw"
                                    style={{ pointerEvents: "none"}}
                                ></i>
                            </button>
                            <div className="text-dark">Womens Jewellery</div>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Categories; 