import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm.js";
import HappyShoppingApi from "../api/api.js";
import ProductCard from "./ProductCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import Categories from "../category/Categories.js";
import Intro from "../intro/Intro.js";

function ProductList() {
    const [products, setProducts] = useState(null);

    useEffect(function getProductsOnMount() {
        search();
    }, []);

    async function search(title) {
        let products = await HappyShoppingApi.getProducts(title);
        setProducts(products);
    }

    async function searchCategory(category) {
        let products = await HappyShoppingApi.getProductsCategory(category);
        setProducts(products);
    }

    if (!products) return <LoadingSpinner />;

    return (
        <section>
            <div className="container">
                <Intro />
                <SearchForm searchFor={search} />
                <Categories searchCategory={searchCategory} />

                {products.length
                    ? (
                        <div className="row flex-grow-1">
                            {products.map(product => (
                                <ProductCard
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
                                    images={product.images}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="lead">Sorry, no results were found!</p>
                    )}
            </div>
        </section>
    );
}

export default ProductList;