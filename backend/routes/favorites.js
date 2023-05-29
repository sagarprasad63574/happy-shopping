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

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const favorites = await Favorite.findAll(req.params.username);
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

router.post("/:username/:id", ensureLoggedIn, async function (req, res, next) {
    const username = req.params.username;
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

router.delete("/:username/:id", ensureLoggedIn, async function (req, res, next) {
    const username = req.params.username;
    const product_id = req.params.id;

    try {
        const favorites = await Favorite.remove(username, product_id);
        return res.json({ deleted: product_id });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[id]  =>  { cart }
 *
 *  Favorite is { username }
 *
 *  Authorization required: ensureLoggedIn
 */

router.delete("/:username", ensureLoggedIn, async function (req, res, next) {
    const username = req.params.username;

    try {
        const favorites = await Favorite.removeAll(username);
        return res.json({ deleted: "Deleted all products in favorites!" });
    } catch (err) {
        return next(err);
    }
});
module.exports = router;