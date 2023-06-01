# happy-shopping

## Table of Contents
1. [Overview](#Overview)
2. [Deployed](#Deployed)
3. [Navigation](#Navigation)
4. [User Flow](#User-Flow)
5. [Features](#Features)
6. [Schema](#Schema)
7. [API](#API)
8. [Technology Stack](#Technology-Stack)

## Overview

### Description
A ecommerce website where users are able to view products (title, description, price, brand, rating, and images). Users are able to add products to their shopping cart and add products to their favorite list. Users are able to view their cart, add the number quantity per product, delete products from cart, and checkout the their products. Users are able to view their favorites list and remove products from their favorites list.       

## Deployed
#### Frontend: 
#### Backend: 

## Navigation

* Home 
* Login / Sign up
* Shop 
  * View products (title, description, brand, price, rating, images)
  * Add products to cart
  * Add products to favorites
* Cart 
  * View all products in cart
  * Add quantity to each product
  * Remove a product from cart
  * Add shopping amount
  * Checkout all products
* Favorites
  * View all products in favorites
  * Remove a product from favorites
  * Clear favorites list
  
## User-Flow
* Using tokens: if the user is not logged in, redirect to the login page or create an account page. 
* If the user is logged in or created an account, direct the user to the home page where user is able to click on their shop, cart, and favorites links.
* If the user clicks on the shop link on the navigation bar, show to user all products in the shop. User is able to search for a product by entering the title of a product. User is able to select a category to query the products. User is able to enter a min and max to query the products.
* Each product has two buttons. One for adding products to the user's cart. User is able to click on the add to cart button, user is cannot add the same product to the cart. The second button is for adding products to the user's favorites list. User is able to click on the heart icon to add products to their favorites list, user cannot add the same product to their favorites list.
* If the user clicks on the cart link on the navigation bar, then the user will be shown a shopping cart page, where the user is able to see all their products added to their cart.
* User is able to remove any products in their cart. User is also able to add the quantity of each product that they would like to buy. User is able to add the delivery charge and view their final total. Lastly, user is able to checkout all the products (clearing their shopping cart)
* If the user clicks on the favorite link on the navigation bar, then the user will be shown a favorites list page, where the user is able to see all their products added to their favorites list.
* User is able to remove any or all products from their favorites list.
* If the user clicks on the logout link on the navigation bar, the user will be logout out of their account and redirected to login page. 

## Features

## Schema 

### Models
#### User

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | username | VarChar | Primary Key |
   | first_name | Text | Not null |
   | last_name | Text | Not null |
   | password | Text | Not null |
   | email | Text | Not null |
   | is_admin | Boolean | Not null |
   
 #### Products

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | id | Integer | Primary Key |
   | title | Text | Not null |
   | description | Text | Not null |
   | price | Float | Not null |
   | discountPercentage | Float | Not null |
   | rating | Float | Not null |
   | stock | Integer | Not null |
   | brand | Text | Not null |
   | category | Text | Not null |
   | thumbnail | Text | Not null |
   
#### Images

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | key | Integer | Primary Key |
   | id | Text | Foreign Key |
   | image_url | Text |  |

#### Cart

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | username | VarChar | Foreign Key |
   | product_id | Integer | Foreign Key |
   | quantity | Integer | Not null |
   
 #### Favorites

   | Property      | Type     | Description |
   | ------------- | -------- | ------------|
   | username | VarChar | Foreign Key |
   | product_id | Integer | Foreign Key |

## API
### https://dummyjson.com/

## Technology-Stack
* Python, requests, json, blueprints
* Flask framework
* SQL Alchemy
* Git
* Heroku
