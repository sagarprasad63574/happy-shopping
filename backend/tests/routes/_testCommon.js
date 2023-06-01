const bcrypt = require("bcrypt");

const db = require("../../db.js");
const User = require("../../models/user.js");
const Product = require("../../models/products.js");
const Cart = require("../../models/cart.js");
const Favorite = require("../../models/favorites.js");
const { createToken } = require("../../helpers/tokens.js");
const { BCRYPT_WORK_FACTOR } = require("../../config.js");
const products = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM favorites");
  await db.query("DELETE FROM cart");
  await db.query("DELETE FROM products");
  await db.query("DELETE FROM users");

  products[0] = (await Product.create(
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    })).id;

  await Product.create(
    {
      id: 2,
      title: "iPhone X",
      description: "SIM-Free,  Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
    });

  await Product.create(
    {
      id: 3,
      title: "Samsung Universe 9",
      description: "Samsung new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    })

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });

  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });

  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

  await Cart.add("u1", 1);
  await Favorite.add("u1", 1);

}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  products,
  u1Token,
  u2Token,
  adminToken
};