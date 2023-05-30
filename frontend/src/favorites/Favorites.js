import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HappyShoppingApi from "../api/api.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import UserContext from "../auth/UserContext.js";
import FavoriteCard from "./FavoriteCard.js";
import "./Favorites.css";

function Favorites() {
    const { currentUser, setFavoritesProducts } = useContext(UserContext);
    const [products, setProducts] = useState(null);
    const [favoriteItems, setfavoriteItems] = useState(null);
    const [cartItems, setcartItems] = useState(null);

    // useEffect(function getProductsOnMount() {
    //     findProducts();
    //     findTotalItems();
    // }, []);

    useEffect(() => {
        async function getProductsOnMount() {
            let favorites = await HappyShoppingApi.getProductsInFavorites(currentUser.username);
            setProducts(favorites);

            let itemsInFavorites = 0;

            favorites.forEach(product => {
                itemsInFavorites += 1;
            });
    
            let cart = await HappyShoppingApi.getProductsInCart(currentUser.username);
    
            let itemsInCart = 0;
    
            cart.forEach(product => {
                itemsInCart += product.quantity;
            });
    
            setfavoriteItems(itemsInFavorites);
            setcartItems(itemsInCart);
        }
        getProductsOnMount();
      }, [currentUser.username])

    async function updateFavoriteProducts() {
        let productsInFavorites = await HappyShoppingApi.getProductsInFavorites(currentUser.username);
        let products_favorites = [];
        productsInFavorites.forEach(product => products_favorites.push(product.product_id));
        setFavoritesProducts(new Set(products_favorites));
    }

    async function findProducts() {
        let products = await HappyShoppingApi.getProductsInFavorites(currentUser.username);
        setProducts(products);
    }

    async function findTotalItems() {
        let favorites = await HappyShoppingApi.getProductsInFavorites(currentUser.username);

        let itemsInFavorites = 0;

        favorites.forEach(product => {
            itemsInFavorites += 1;
        });

        let cart = await HappyShoppingApi.getProductsInCart(currentUser.username);

        let itemsInCart = 0;

        cart.forEach(product => {
            itemsInCart += product.quantity;
        });

        setfavoriteItems(itemsInFavorites);
        setcartItems(itemsInCart);
    }

    async function deleteAllProducts() {
        await HappyShoppingApi.deleteAllProductInFavorites(currentUser.username);

        findProducts();
        findTotalItems()
        updateFavoriteProducts();
    }

    if (!products) return <LoadingSpinner />;

    return (
        <div className="container padding-bottom-3x mb-2">
            <div className="row">
                <div className="col-lg-4">
                    <aside className="user-info-wrapper">
                        <div className="user-info">
                            <div className="user-data">
                                <h4>WELCOME</h4>
                                <h4>{currentUser.firstName} {currentUser.lastName}</h4>
                            </div>
                        </div>
                    </aside>
                    <nav className="list-group">
                        <Link to="/cart" className="list-group-item with-badge">
                            <i className=" fa fa-th"></i>
                            Cart
                            <span className="badge badge-primary badge-pill">
                                {cartItems}
                            </span>
                        </Link>
                        <Link to="/profile" className="list-group-item">
                            <i className="fa fa-user"></i>Profile
                        </Link>
                        <Link to="/favorites" className="list-group-item with-badge active">
                            <i className="fa fa-heart"></i>
                            Favorites
                            <span className="badge badge-primary badge-pill">
                                {favoriteItems}
                            </span>
                        </Link>
                    </nav>
                </div>
                <div className="col-lg-8">
                    <div className="padding-top-2x mt-2 hidden-lg-up"></div>
                    <div className="table-responsive wishlist-table margin-bottom-none">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={deleteAllProducts}
                                        >Clear Favorites</button>
                                    </th>
                                </tr>
                            </thead>
                            {products.length
                                ? (
                                    <tbody>
                                        {products.map(product => (
                                            <FavoriteCard
                                                key={product.id}
                                                id={product.id}
                                                title={product.title}
                                                description={product.description}
                                                price={product.price}
                                                discountPercentage={product.discountPercentage}
                                                rating={product.rating}
                                                stock={product.stock}
                                                brand={product.brand}
                                                category={product.category}
                                                thumbnail={product.thumbnail}
                                                findTotalItems={findTotalItems}
                                            />
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody className="lead"><tr><td>Sorry, no products in favorites!</td></tr></tbody>
                                )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favorites;