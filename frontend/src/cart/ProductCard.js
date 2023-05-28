import React, { useContext, useState, useEffect } from "react";
import "./ProductCard.css";

function ProductCard({ id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }) {

    return (
        // <div className="ProductCard">

        //     {<img className="card-img-top" style={{ height: 300 }} src={thumbnail}
        //         alt={thumbnail} />}

        //     <div className="card-body">
        //         <h5 className="card-title">
        //             {title}<br></br>
        //             {category}

        //         </h5>
        //         <p>
        //             <small>{description}</small>
        //         </p>
        //         <p className="card-text">
        //             Rating: {rating} Stock: {stock}<br></br>
        //         </p>
        //         <h5> ${price} </h5>

        //     </div>
        // </div>

        <div className="row mb-4 d-flex justify-content-between align-items-center">
            <div className="col-md-2 col-lg-2 col-xl-3">
                <img
                    src={thumbnail}
                    className="img-fluid rounded-3" alt="Cotton T-shirt"></img>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
                <h6 className="text-muted">{category}</h6>
                <h6 className="text-black mb-0">{title}</h6>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button className="btn btn-link px-2"
                >
                    <i className="fas fa-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" type="number" value="1s"
                    className="form-control form-control-sm" />

                <button className="btn btn-link px-2"
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 className="mb-0">${price}</h6>
            </div>
            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
            </div>
        </div>

    );
}

export default ProductCard;