import React from "react";
import { Link } from "react-router-dom";
// import "./CompanyCard.css";

function ProductCard({ id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }) {

    return (
        <Link className="ProductCard card" to={`/products/${id}`}>
            <div className="card-body">
                <h6 className="card-title">
                    id: {id}
                    title: {title}
                    price: {price}
                    discountPercentage: {discountPercentage}
                    rating: {rating}
                    stock: {stock}
                    brand: {brand}
                    category: {category}

                    {<img src={thumbnail}
                        alt={thumbnail}
                        className="float-right ml-5" />}
                </h6>
                <p>
                    <small>{description}</small>
                </p>
            </div>
        </Link>
    );
}

export default ProductCard;