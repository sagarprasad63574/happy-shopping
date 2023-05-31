"use strict";

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../../expressError");
const db = require("../../db.js");
const Cart = require("../../models/cart.js");
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

/************************************** add */

describe("add", function () {
    test("works", async function () {
        const cart = await Cart.add("u1", 2);
        expect(cart).toEqual({
            username: "u1",
            product_id: 2,
        });
    });

    test("Product already added to cart", async function () {
        try {
            await Cart.add("u1", 1);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });

    test("No product found", async function () {
        try {
            await Cart.add("u1", 4);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** findAll */

describe("findAll", function () {
    test("works", async function () {
        const cart = await Cart.findAll("u1");
        expect(cart).toEqual([
            {
                username: "u1",
                product_id: 1,
                quantity: 1,
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
            }
        ]);
    });
});

/************************************** remove */

describe("remove", function () {
    test("works", async function () {
        await Cart.remove("u1", 1);
        const res = await db.query(
            "SELECT * FROM cart WHERE username='u1'");
        expect(res.rows.length).toEqual(0);
    });

    test("No product found", async function () {
        try {
            await Cart.remove("u1", 2);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** removeAll */

describe("removeAll", function () {
    test("works", async function () {
        await Cart.removeAll("u1");
        const res = await db.query(
            "SELECT * FROM cart WHERE username='u1'");
        expect(res.rows.length).toEqual(0);
    });
});

/************************************** increment */

describe("increment", function () {
    test("works", async function () {
        const cart = await Cart.increment("u1", 1);
        expect(cart).toEqual(
            {
                username: "u1",
                product_id: 1,
                quantity: 2
            }
        );
    });
});

/************************************** decrement */

describe("decrement", function () {
    test("Quantity cannot be lower than 1", async function () {
        try {
            await Cart.decrement("u1", 1);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });

    test("works", async function () {
        await Cart.increment("u1", 1);

        const cart = await Cart.decrement("u1", 1);
        expect(cart).toEqual(
            {
                username: "u1",
                product_id: 1,
                quantity: 1
            }
        );
    });
});