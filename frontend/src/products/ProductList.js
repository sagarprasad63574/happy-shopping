import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm.js";
import HappyShoppingApi from "../api/api.js";
import ProductCard from "./ProductCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";

function ProductList() {
    const [products, setProducts] = useState(null);

    useEffect(function getProductsOnMount() {
        search();
    }, []);

    async function search(title) {
        let products = await HappyShoppingApi.getProducts(title);
        setProducts(products);
    }

    if (!products) return <LoadingSpinner />;
    
    return (
        <div className="ProductList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {products.length
                ? (
                    <div className="ProductList-list">
                        {products.map(product => (
                            <ProductCard
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
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default ProductList;