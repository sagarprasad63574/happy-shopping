import React, { useContext, useState, useEffect } from "react";
import "./ProductCard.css";
import HappyShoppingApi from "../api/api.js";
import UserContext from "../auth/UserContext.js";

function ProductCard({ id, title, quantity, description, price, discountPercentage, rating, stock, brand, category, thumbnail }) {
    const { currentUser } = useContext(UserContext);
    const [productQuantity, setProductQuantity] = useState(quantity);

    async function increment() {
        let qty = await HappyShoppingApi.incrementQuantity(currentUser.username, id);
        setProductQuantity(qty.quantity);
    }

    return (
        <div className="row mb-4 d-flex justify-content-between align-items-center">
            <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                    src={thumbnail}
                    className="img-fluid rounded-3" alt="Cotton T-shirt"></img>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3">
                <h6 className="text-muted">{category}</h6>
                <h6 className="text-black mb-0">{title}</h6>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3 d-flex">
                <button className="btn btn-link px-2">
                    <i className="fas fa-minus"></i>
                </button>

                <input className="form-control form-control-sm" value={productQuantity} onChange={increment()}/>
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