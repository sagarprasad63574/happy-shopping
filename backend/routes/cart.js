"use strict";

/** Routes for cart. */

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Cart = require("../models/cart");

const router = new express.Router();

/** GET /  =>
 *   { cart: [ { username, product_id }, ...] }
 *
 *   Authorization required: ensureLoggedIn
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
    const username = res.locals.user.username; 

    try {
        const cart = await Cart.findAll(username);
        return res.json({ cart });
    } catch (err) {
        return next(err);
    }
});

/** POST /[id]  =>  { cart }
 *
 *  Cart is { username, product_id }
 *
 *  Authorization required: ensureLoggedIn
 */

router.post("/:id", ensureLoggedIn, async function (req, res, next) {
    const username = res.locals.user.username;
    const product_id = req.params.id;

    try {
        const cart = await Cart.add(username, product_id);
        return res.json({ cart });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[id]  =>  { cart }
 *
 *  Cart is { username, product_id }
 *
 *  Authorization required: ensureLoggedIn
 */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
    const username = res.locals.user.username;
    const product_id = req.params.id;

    try {
        const cart = await Cart.remove(username, product_id);
        return res.json({ cart });
    } catch (err) {
        return next(err);
    }
});
module.exports = router;