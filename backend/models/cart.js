"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for cart. */

class Cart {
    /** Add a new product to Cart, update db, return new cart data.
     *
     * Returns { username, product_id }
     *
     * Throws BadRequestError if product already in cart.
     * */

    static async add(username, product_id) {
        const checkProductExists = await db.query(
            `SELECT * FROM products
            WHERE id = $1`,
            [product_id]);

        const product = checkProductExists.rows[0];
        if (!product) throw new NotFoundError(`No product found!`);

        const duplicateCheck = await db.query(
            `SELECT username, product_id
            FROM cart
            WHERE username = $1 AND product_id = $2`,
            [username, product_id]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Product already added to cart`);

        const result = await db.query(
            `INSERT INTO cart
           (username, product_id)
           VALUES ($1, $2)
           RETURNING username, product_id`,
            [
                username,
                product_id
            ],
        );
        const cart = result.rows[0];

        return cart;
    }

    /** Get all products from cart by current user.
     *
     * Returns { cart: [ {username, product_id}, ... }
     * */

    static async findAll(username) {

        const result = await db.query(
            `SELECT * 
            FROM cart 
            JOIN products 
            ON cart.product_id = products.id 
            WHERE cart.username = $1
            ORDER BY products.id`,
            [username],
        );

        for (let product of result.rows) {
            const imageRes = await db.query(
                `SELECT key, id, image_url
                FROM images
                WHERE id = $1
                ORDER BY id`,
                [product.id],
            );
            product.images = imageRes.rows;
        }
        return result.rows;
    }

    /** Remove a product from cart by current user.
     *
     * Returns {username, product_id}
     * */

    static async remove(username, product_id) {
        const result = await db.query(
            `DELETE
           FROM cart
           WHERE username = $1 
           AND product_id = $2
           RETURNING username, product_id`,
            [username, product_id]);
        const cart = result.rows[0];

        if (!cart) throw new NotFoundError(`No product found!`);
    }

    /** Remove a product from cart by current user.
     *
     * Returns {username, product_id}
     * */

    static async removeAll(username) {
        const result = await db.query(
            `DELETE 
               FROM cart
               WHERE username = $1 
               RETURNING username, product_id, quantity`,
            [username]);

        const cart = result.rows;

        if (!cart) throw new NotFoundError(`No products in cart!`);
    }

    static async increment(username, product_id) {
        const checkProductExists = await db.query(
            `SELECT * FROM products
            WHERE id = $1`,
            [product_id]);

        const product = checkProductExists.rows[0];
        if (!product) throw new NotFoundError(`No product found!`);

        let quantity = await db.query(
            `SELECT quantity 
            FROM cart
            WHERE username = $1 AND product_id = $2`,
            [
                username,
                product_id
            ]
        );

        let qty = quantity.rows[0].quantity;
        qty = qty + 1;

        const result = await db.query(
            `UPDATE cart
            SET quantity = $1
            WHERE username = $2 AND product_id = $3
            RETURNING username, product_id, quantity`,
            [
                qty,
                username,
                product_id
            ],
        );

        const cart = result.rows[0];
        return cart;
    }

    static async decrement(username, product_id) {
        const checkProductExists = await db.query(
            `SELECT * FROM products
            WHERE id = $1`,
            [product_id]);

        const product = checkProductExists.rows[0];
        if (!product) throw new NotFoundError(`No product found!`);
        
        let quantity = await db.query(
            `SELECT quantity 
            FROM cart
            WHERE username = $1 AND product_id = $2`,
            [
                username,
                product_id
            ]
        );

        let qty = quantity.rows[0].quantity;

        if (qty - 1 < 1) throw new BadRequestError(`Quantity cannot be lower than 1`)
        qty = qty - 1;

        const result = await db.query(
            `UPDATE cart
            SET quantity = $1
            WHERE username = $2 AND product_id = $3
            RETURNING username, product_id, quantity`,
            [
                qty,
                username,
                product_id
            ],
        );

        const cart = result.rows[0];
        return cart;
    }
}


module.exports = Cart;