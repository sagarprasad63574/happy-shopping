import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HappyShoppingApi from "../api/api.js";
import ProductCard from "./ProductCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import UserContext from "../auth/UserContext.js";

function Cart() {
    const { currentUser, setCartProducts } = useContext(UserContext);
    const [products, setProducts] = useState(null);
    const [itemPrices, setItemPrices] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [totalItems, setTotalItems] = useState(null);

    useEffect(() => {
        async function getProductsOnMount() {
            let products = await HappyShoppingApi.getProductsInCart(currentUser.username);
            setProducts(products);

            let total = 0;
            products.forEach(product => {
                total += product.quantity * product.price;
            });
    
            let items = 0;
            products.forEach(product => {
                items += product.quantity;
            });
    
            setItemPrices(total);
            setTotalItems(items);
            setTotalPrice(total + 5);
        }
        getProductsOnMount();
      }, [currentUser.username])
      
    async function findProducts() {
        let products = await HappyShoppingApi.getProductsInCart(currentUser.username);
        setProducts(products);
    }

    async function updateCartProducts() {
        let productsInCart = await HappyShoppingApi.getProductsInCart(currentUser.username);
        let products_cart = [];
        productsInCart.forEach(product => products_cart.push(product.product_id));
        setCartProducts(new Set(products_cart));
    }

    async function calculateTotalPrice() {
        let products = await HappyShoppingApi.getProductsInCart(currentUser.username);

        let total = 0;
        products.forEach(product => {
            total += product.quantity * product.price;
        });

        let items = 0;
        products.forEach(product => {
            items += product.quantity;
        });

        setItemPrices(total);
        setTotalItems(items);
        setTotalPrice(total + 5);
    }

    async function calculateShipping(evt) {
        let shipping = +evt.target.value;
        setTotalPrice(itemPrices + shipping);
    }

    async function deleteAllProducts() {
        await HappyShoppingApi.deleteAllProductInCart(currentUser.username);
        
        findProducts();
        calculateTotalPrice();
        updateCartProducts();
    }

    if (!products) return <LoadingSpinner />;

    return (
        <section className="h-100 h-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                <h6 className="mb-0 text-muted">{totalItems} items</h6>
                                            </div>
                                            {products.length
                                                ? (
                                                    <div>
                                                        {products.map(product => (
                                                            <ProductCard
                                                                key={product.id}
                                                                id={product.id}
                                                                quantity={product.quantity}
                                                                title={product.title}
                                                                description={product.description}
                                                                price={product.price}
                                                                discountPercentage={product.discountPercentage}
                                                                rating={product.rating}
                                                                stock={product.stock}
                                                                brand={product.brand}
                                                                category={product.category}
                                                                thumbnail={product.thumbnail}
                                                                calculateTotalPrice={calculateTotalPrice}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="lead">Sorry, no products in cart!</p>
                                                )}
                                            <div className="pt-5">
                                                <h6 className="mb-0">
                                                    <Link to="/products"> 
                                                        <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                        Back to shop
                                                    </Link>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>

                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">items {totalItems}</h5>
                                                <h5>$ {itemPrices}</h5>
                                            </div>

                                            <h5 className="text-uppercase mb-3">Shipping</h5>

                                            <div className="mb-4 pb-2">
                                                <select className="select" onChange={calculateShipping}>
                                                    <option value="5">Standard-Delivery- $5.00</option>
                                                    <option value="25">Two- $25.00</option>
                                                    <option value="15">Three- $15.00</option>
                                                    <option value="10">Four- $10.00</option>
                                                </select>
                                            </div>

                                            <h5 className="text-uppercase mb-3">Give code</h5>

                                            <div className="mb-5">
                                                <div className="form-outline">
                                                    <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Total price</h5>
                                                <h5>$ {totalPrice}</h5>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-dark btn-block btn-lg"
                                                data-mdb-ripple-color="dark"
                                                onClick={deleteAllProducts}>
                                                Checkout
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;