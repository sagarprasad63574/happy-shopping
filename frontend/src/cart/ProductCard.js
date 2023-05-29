import React, { useContext, useState, useEffect } from "react";
import "./ProductCard.css";
import HappyShoppingApi from "../api/api.js";
import UserContext from "../auth/UserContext.js";

function ProductCard({ id, title, quantity, description, price, discountPercentage, rating, stock, brand, category, thumbnail, calculateTotalPrice }) {
    const { currentUser, setCartProducts } = useContext(UserContext);
    const [productQuantity, setProductQuantity] = useState(quantity);
    const [show, setShow] = useState(true);

    async function updateCartProducts() {
        let productsInCart = await HappyShoppingApi.getProductsInCart(currentUser.username);
        let products_cart = [];
        productsInCart.forEach(product => products_cart.push(product.product_id));
        setCartProducts(new Set(products_cart));
    }
    
    async function increment() {
        let qty = await HappyShoppingApi.incrementQuantity(currentUser.username, id);
        setProductQuantity(qty.quantity);
        calculateTotalPrice();
    }

    async function decrement() {
        if (productQuantity == 1) return; 
        let qty = await HappyShoppingApi.decrementQuantity(currentUser.username, id);
        setProductQuantity(qty.quantity);
        calculateTotalPrice();
    }

    async function remove() {
        let remove = await HappyShoppingApi.deleteProductInCart(currentUser.username, id);
        setShow(false);
        calculateTotalPrice();
        updateCartProducts();
    }

    return (
        <div className="row mb-4 d-flex justify-content-between align-items-center">
            {show ? (
                <>
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
                        <button
                            className="btn btn-link px-2"
                            onClick={decrement}
                        >
                            <i className="fas fa-minus"></i>
                        </button>

                        <div className="form-control form-control-sm"> {productQuantity} </div>

                        <button
                            className="btn btn-link px-2"
                            onClick={increment}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 className="mb-0">${productQuantity * price}</h6>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={remove}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default ProductCard;