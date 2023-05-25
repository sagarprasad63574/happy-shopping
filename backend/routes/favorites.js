"use strict";

/** Routes for favorites. */

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Favorite = require("../models/favorites");

const router = new express.Router();

/** GET /  =>
 *   { favorites: [ { username, product_id }, ...] }
 *
 *   Authorization required: ensureLoggedIn
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
    const username = res.locals.user.username; 

    try {
        const favorites = await Favorite.findAll(username);
        return res.json({ favorites });
    } catch (err) {
        return next(err);
    }
});

/** POST /[id]  =>  { favorites }
 *
 *  Favorite is { username, product_id }
 *
 *  Authorization required: ensureLoggedIn
 */

router.post("/:id", ensureLoggedIn, async function (req, res, next) {
    const username = res.locals.user.username;
    const product_id = req.params.id;

    try {
        const favorites = await Favorite.add(username, product_id);
        return res.json({ favorites });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[id]  =>  { cart }
 *
 *  Favorite is { username, product_id }
 *
 *  Authorization required: ensureLoggedIn
 */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
    const username = res.locals.user.username;
    const product_id = req.params.id;

    try {
        const favorites = await Favorite.remove(username, product_id);
        return res.json({ deleted: product_id });
    } catch (err) {
        return next(err);
    }
});
module.exports = router;