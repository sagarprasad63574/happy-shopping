"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for favorites. */

class Favorite {
    /** Add a new product to Favorite, update db, return new cart data.
     *
     * Returns { username, product_id }
     *
     * Throws BadRequestError if product already in favorites.
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
            FROM favorites
            WHERE username = $1 AND product_id = $2`,
            [username, product_id]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Product already added to cart`);

        const result = await db.query(
            `INSERT INTO favorites
           (username, product_id)
           VALUES ($1, $2)
           RETURNING username, product_id`,
            [
                username,
                product_id
            ],
        );
        const favorites = result.rows[0];

        return favorites;
    }

    /** Get all products from favorites by current user.
     *
     * Returns { favorites: [ {username, product_id}, ... }
     * */

    static async findAll(username) {

        const result = await db.query(
            `SELECT * 
            FROM favorites 
            JOIN products 
            ON favorites.product_id = products.id 
            WHERE favorites.username = $1
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
           FROM favorites
           WHERE username = $1 
           AND product_id = $2
           RETURNING username, product_id`,
            [username, product_id]);
        const favorites = result.rows[0];

        if (!favorites) throw new NotFoundError(`No product found!`);
    }

    /** Remove a product from cart by current user.
     *
     * Returns {username, product_id}
     * */

    static async removeAll(username) {
        const result = await db.query(
            `DELETE 
               FROM favorites
               WHERE username = $1 
               RETURNING username, product_id`,
            [username]);

        const cart = result.rows;

        if (!cart) throw new NotFoundError(`No products in favorites!`);
    }
}


module.exports = Favorite;