import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext.js";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }) {
    const { hasAddedToCart, addToCart, hasAddedToFavorites, addToFavorites} = useContext(UserContext);
    const [added, setAdded] = useState();
    const [favorites, setFavorites] = useState();

    useEffect(function updateAddedStatus() {
        setAdded(hasAddedToCart(id));
    }, [id, hasAddedToCart]);

    useEffect(function updateFavoriteStatus() {
        setFavorites(hasAddedToFavorites(id));
    }, [id, hasAddedToFavorites]);


    async function handleAdd(evt) {
        if (hasAddedToCart(id)) return;
        addToCart(id);
        setAdded(true);
    }

    async function handleFavorites(evt) {
        if (hasAddedToFavorites(id)) return;
        addToFavorites(id);
        setFavorites(true);
    }

    return (
        <div className="col-sm-4 mt-4">
            {<img className="card-img-top" style={{ height: 200 }} src={thumbnail}
                alt={thumbnail} />}

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        {title}<br></br>
                        {category}
                    </h5>
                    <p className="card-text">
                        <small>{description}</small> <br></br>
                        Rating: {rating} Stock: {stock}<br></br>
                    </p>
                    <h3> ${price} </h3>
                    <button
                        className="btn btn-success shadow-0 mr-3"
                        onClick={handleAdd}
                        disabled={added}
                    >
                        {added ? "In cart" : "Add to cart"}
                    </button>
                    <button
                        className="btn btn-light border icon-hover px-3 pt-2"
                        onClick={handleFavorites}
                        disabled={favorites}
                    >
                        {favorites ? <i className="bi bi-heart-fill" style={{color: "red"}}></i> : <i className="bi bi-heart"></i>}
                    </button>
                </div>
            </div>
        </div>

    );
}

export default ProductCard;