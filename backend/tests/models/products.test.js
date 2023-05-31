"use strict";

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../../expressError");
const db = require("../../db.js");
const Product = require("../../models/products.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** authenticate */

describe("create", function () {
    const newProduct = {
        id: 999,
        title: "iPhone 10",
        description: "New iPhone",
        price: 123,
        discountPercentage: 10.99,
        rating: 4,
        stock: 100,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "none"
    };

    test("works", async function () {
        const product = await Product.create(newProduct);
        expect(product).toEqual(
            {
                id: 999,
                title: "iPhone 10",
                description: "New iPhone",
                price: 123,
                discountpercentage: 10.99,
                rating: 4,
                stock: 100,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "none"
            }
        );

        const result = await db.query(
            `SELECT *
             FROM products
             WHERE id = 999`);
        expect(result.rows).toEqual([
            {
                id: 999,
                title: "iPhone 10",
                description: "New iPhone",
                price: 123,
                discountpercentage: 10.99,
                rating: 4,
                stock: 100,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "none"
            },
        ]);
    });

    test("bad request with dupe", async function () {
        try {
            await Product.create(newProduct);
            await Product.create(newProduct);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });

});

/************************************** findAll */

describe("findAll", function () {
    test("works: all", async function () {
        let products = await Product.findAll();
        expect(products).toEqual([
            {
                id: 1,
                title: "iPhone 9",
                description: "An apple mobile which is nothing like apple",
                price: 549,
                discountpercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                images: []
            },
            {
                id: 2,
                title: "iPhone X",
                description: "SIM-Free,  Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                price: 899,
                discountpercentage: 17.94,
                rating: 4.44,
                stock: 34,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
                images: []
            },
            {
                id: 3,
                title: "Samsung Universe 9",
                description: "Samsung new variant which goes beyond Galaxy to the Universe",
                price: 1249,
                discountpercentage: 15.46,
                rating: 4.09,
                stock: 36,
                brand: "Samsung",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                images: []
            },
        ]);
    });

    test("works: by title", async function () {
        let products = await Product.findAll({ title: "iPhone 9" });
        expect(products).toEqual([
            {
                id: 1,
                title: "iPhone 9",
                description: "An apple mobile which is nothing like apple",
                price: 549,
                discountpercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                images: []
            },
        ]);
    });

    test("works: empty list on nothing found", async function () {
        let products = await Product.findAll({ title: "nope" });
        expect(products).toEqual([]);
    });


    test("works: by category", async function () {
        let products = await Product.findAll({ category: "smartphones" });
        expect(products).toEqual([
            {
                id: 1,
                title: "iPhone 9",
                description: "An apple mobile which is nothing like apple",
                price: 549,
                discountpercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                images: []
            },
            {
                id: 2,
                title: "iPhone X",
                description: "SIM-Free,  Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                price: 899,
                discountpercentage: 17.94,
                rating: 4.44,
                stock: 34,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
                images: []
            },
            {
                id: 3,
                title: "Samsung Universe 9",
                description: "Samsung new variant which goes beyond Galaxy to the Universe",
                price: 1249,
                discountpercentage: 15.46,
                rating: 4.09,
                stock: 36,
                brand: "Samsung",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                images: []
            },
        ]);
    });

    test("works: empty category list", async function () {
        let products = await Product.findAll({ category: "nope" });
        expect(products).toEqual([]);
    });

    test("works: by min price", async function () {
        let products = await Product.findAll({ min: 900 });
        expect(products).toEqual([
            {
                id: 3,
                title: "Samsung Universe 9",
                description: "Samsung new variant which goes beyond Galaxy to the Universe",
                price: 1249,
                discountpercentage: 15.46,
                rating: 4.09,
                stock: 36,
                brand: "Samsung",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                images: []
            },
        ]);
    });

    test("works: by max price", async function () {
        let products = await Product.findAll({ max: 600 });
        expect(products).toEqual([
            {
                id: 1,
                title: "iPhone 9",
                description: "An apple mobile which is nothing like apple",
                price: 549,
                discountpercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                images: []
            },
        ]);
    });
});

/************************************** get */

describe("get", function () {
    test("works", async function () {
        let product = await Product.get(1);
        expect(product).toEqual({
            id: 1,
            title: "iPhone 9",
            description: "An apple mobile which is nothing like apple",
            price: 549,
            discountpercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            images: []
        });
    });

    test("not found if no such product", async function () {
        try {
            await Product.get(4);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** update */

describe("update", function () {
    const updateData = {
        id: 1,
        title: "iPhone 10",
        description: "Apple",
        price: 123,
        discountpercentage: 10.00,
        rating: 4,
        stock: 100,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    };

    test("works", async function () {
        let product = await Product.update(1, updateData);
        expect(product).toEqual({
            ...updateData,
        });

        const result = await db.query(
            `SELECT *
             FROM products
             WHERE id = 1`);
        expect(result.rows).toEqual([{
            id: 1,
            title: "iPhone 10",
            description: "Apple",
            price: 123,
            discountpercentage: 10.00,
            rating: 4,
            stock: 100,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
        }]);
    });

    test("not found if no such product", async function () {
        try {
            await Product.update(4, updateData);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

    test("bad request with no data", async function () {
        try {
            await Product.update(1, {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", function () {
    test("works", async function () {
        await Product.remove(1);
        const res = await db.query(
            "SELECT id FROM products WHERE id = 1");
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such product", async function () {
        try {
            await Product.remove(4);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});