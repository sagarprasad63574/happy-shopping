import React, { useContext, useState } from "react";
import HappyShoppingApi from "../api/api.js";
import UserContext from "../auth/UserContext.js";

function ProductCard({ id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, findTotalItems }) {
    const { currentUser, setFavoritesProducts } = useContext(UserContext);
    const [show, setShow] = useState(true);

    async function updateFavoriteProducts() {
        let productsInFavorites = await HappyShoppingApi.getProductsInFavorites(currentUser.username);
        let products_favorites = [];
        productsInFavorites.forEach(product => products_favorites.push(product.product_id));
        setFavoritesProducts(new Set(products_favorites));
    }

    async function remove() {
        await HappyShoppingApi.deleteProductInFavorites(currentUser.username, id);
        setShow(false);
        findTotalItems();
        updateFavoriteProducts();
    }

    return (
        <tr>
            {show ? (
                <><td>
                    <div className="product-item">
                        <img src={thumbnail} alt="Product" className="product-thumb"></img>
                        <div className="product-info">
                            <h4 className="product-title">{title}</h4>
                            <div className="text-lg text-medium text-muted">${price}</div>
                            <div>Availability:
                                <div className="d-inline text-success"> In Stock</div>
                            </div>
                        </div>
                    </div>
                </td><td className="text-center">
                        <button
                            className="btn btn-danger btn-mg"
                            onClick={remove}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </td></>
            ) : null}
        </tr>
    );
}

export default ProductCard;