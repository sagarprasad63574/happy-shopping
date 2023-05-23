"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for products. */

class Product {
    /** Create a Product (from data), update db, return new product data.
     *
     * data should be { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }
     *
     * Returns { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }
     *
     * Throws BadRequestError if product already in database.
     * */

    static async create({ id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }) {
        const duplicateCheck = await db.query(
            `SELECT id
           FROM products
           WHERE handle = $1`,
            [id]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate product: ${title}`);

        const result = await db.query(
            `INSERT INTO products
           (id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           RETURNING id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail`,
            [
                id,
                title,
                description,
                price,
                discountPercentage,
                rating,
                stock,
                brand,
                category,
                thumbnail
            ],
        );
        const product = result.rows[0];

        return product;
    }

    /** Find all products (optional filter on searchFilters).
     *
     * searchFilters (all optional):
     * - category
     * - name (will find case-insensitive, partial matches)
     *
     * Returns [{ title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }, ...]
     * */

    static async findAll(searchFilters = {}) {
        let query = `SELECT title,
                        description,
                        price,
                        discountPercentage,
                        rating,
                        stock,
                        brand,
                        category,
                        thumbnail
                 FROM products`;
        let whereExpressions = [];
        let queryValues = [];

        const { category, title } = searchFilters;

        // For each possible search term, add to whereExpressions and queryValues so
        // we can generate the right SQL

        if (title) {
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if (category) {
            queryValues.push(`%${category}%`);
            whereExpressions.push(`category ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }

        // Finalize query and return results
        query += " ORDER BY title";
        const productRes = await db.query(query, queryValues);
        return productRes.rows;
    }

    /** Given a product title, return data about product.
     *
     * Returns { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail }
     *   where title is title
     *
     * Throws NotFoundError if not found.
     **/

    static async get(title) {
        const productRes = await db.query(
            `SELECT 
                  id,
                  title,
                  description,
                  price,
                  discountPercentage,
                  rating,
                  stock, 
                  category,
                  thumbnail
           FROM products
           WHERE title = $1`,
            [title]);

        const product = productRes.rows[0];

        if (!product) throw new NotFoundError(`No product: ${title}`);

        const imageRes = await db.query(
            `SELECT id, image_url
            FROM images
            WHERE id = $1
            ORDER BY id`,
            [product.id],
        );

        product.images = imageRes.rows;

        return product;
    }

    /** Update product data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: {name, description, numEmployees, logoUrl}
     *
     * Returns {handle, name, description, numEmployees, logoUrl}
     *
     * Throws NotFoundError if not found.
     */

    // static async update(handle, data) {
    //     const { setCols, values } = sqlForPartialUpdate(
    //         data,
    //         {
    //             numEmployees: "num_employees",
    //             logoUrl: "logo_url",
    //         });
    //     const handleVarIdx = "$" + (values.length + 1);

    //     const querySql = `UPDATE companies 
    //                   SET ${setCols} 
    //                   WHERE handle = ${handleVarIdx} 
    //                   RETURNING handle, 
    //                             name, 
    //                             description, 
    //                             num_employees AS "numEmployees", 
    //                             logo_url AS "logoUrl"`;
    //     const result = await db.query(querySql, [...values, handle]);
    //     const company = result.rows[0];

    //     if (!company) throw new NotFoundError(`No company: ${handle}`);

    //     return company;
    // }

    /** Delete given company from database; returns undefined.
     *
     * Throws NotFoundError if company not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE
           FROM products
           WHERE id = $1
           RETURNING title`,
            [id]);
        const product = result.rows[0];

        if (!product) throw new NotFoundError(`No product: ${id}`);
    }
}


module.exports = Product;