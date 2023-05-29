import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage.js";
import HappyShoppingApi from "./api/api.js";
import UserContext from "./auth/UserContext.js";
import Navigation from "./routes-nav/Navigation.js";
import Routes from "./routes-nav/Routes.js";
import LoadingSpinner from "./common/LoadingSpinner.js";
import logo from './logo.svg';
import './App.css';

export const TOKEN_STORAGE_ID = "happy-shopping-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [cartProducts, setCartProducts] = useState(new Set([]));
  const [favoritesProducts, setFavoritesProducts] = useState(new Set([]));


  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          HappyShoppingApi.token = token;
          let currentUser = await HappyShoppingApi.getCurrentUser(username);
          setCurrentUser(currentUser);

          let productsInCart = await HappyShoppingApi.getProductsInCart(username);
          let products_cart = [];
          productsInCart.forEach(product => products_cart.push(product.product_id));
          setCartProducts(new Set(products_cart));

          let productsInFavorites = await HappyShoppingApi.getProductsInFavorites(username);
          let products_favorites = [];
          productsInFavorites.forEach(product => products_favorites.push(product.product_id));
          setFavoritesProducts(new Set(products_favorites));

        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function signup(signupData) {
    try {
      let token = await HappyShoppingApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await HappyShoppingApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  function hasAddedToCart(id) {
    return cartProducts.has(id);
  }

  function addToCart(id) {
    if (hasAddedToCart(id)) return;
    HappyShoppingApi.addProductToCart(currentUser.username, id);
    setCartProducts(new Set([...cartProducts, id]));
  }

  function hasAddedToFavorites(id) {
    return favoritesProducts.has(id);
  }

  function addToFavorites(id) {
    if (hasAddedToFavorites(id)) return;
    HappyShoppingApi.addProductToFavorites(currentUser.username, id);
    setFavoritesProducts(new Set([...favoritesProducts, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, 
                setCurrentUser, 
                setCartProducts, 
                setFavoritesProducts, 
                hasAddedToCart, 
                addToCart, 
                hasAddedToFavorites, 
                addToFavorites }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
