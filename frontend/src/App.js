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
// import './App.css';

export const TOKEN_STORAGE_ID = "happy-shopping-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  // const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          HappyShoppingApi.token = token;
          let currentUser = await HappyShoppingApi.getCurrentUser(username);
          setCurrentUser(currentUser);
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

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
