"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Product = require("../models/products");

// const companyNewSchema = require("../schemas/companyNew.json");
// const companyUpdateSchema = require("../schemas/companyUpdate.json");
// const companySearchSchema = require("../schemas/companySearch.json");

const router = new express.Router();


/** POST / { product } =>  { product }
 *
 * company should be { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }
 *
 * Returns { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, productNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const product = await Product.create(req.body);
        return res.status(201).json({ product });
    } catch (err) {
        return next(err);
    }
});

/** GET /  =>
 *   { products: [ { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }, ...] }
 *
 * Can filter on provided search filters:
 * - category
 * - titleLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
    const q = req.query;
    try {
        const validator = jsonschema.validate(q, productSearchSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const products = await Product.findAll(q);
        return res.json({ products });
    } catch (err) {
        return next(err);
    }
});

/** GET /[title]  =>  { product }
 *
 *  Product is { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }
 *   where jobs is [{ id, image_url }, ...]
 *
 * Authorization required: none
 */

router.get("/:title", async function (req, res, next) {
    try {
        const product = await Product.get(req.params.title);
        return res.json({ product });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches company data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: admin
 */

// router.patch("/:handle", ensureAdmin, async function (req, res, next) {
//     try {
//         const validator = jsonschema.validate(req.body, companyUpdateSchema);
//         if (!validator.valid) {
//             const errs = validator.errors.map(e => e.stack);
//             throw new BadRequestError(errs);
//         }

//         const company = await Company.update(req.params.handle, req.body);
//         return res.json({ company });
//     } catch (err) {
//         return next(err);
//     }
// });

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
    try {
        await Product.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;