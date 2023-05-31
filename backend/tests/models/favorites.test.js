"use strict";

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../../expressError");
const db = require("../../db.js");
const Favorite = require("../../models/favorites.js");
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
        const favorites = await Favorite.add("u1", 2);
        expect(favorites).toEqual({
            username: "u1",
            product_id: 2,
        });
    });

    test("Product already added to favorites", async function () {
        try {
            await Favorite.add("u1", 1);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });

    test("No product found", async function () {
        try {
            await Favorite.add("u1", 4);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** findAll */

describe("findAll", function () {
    test("works", async function () {
        const favorites = await Favorite.findAll("u1");
        expect(favorites).toEqual([
            {
                username: "u1",
                product_id: 1,
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
        await Favorite.remove("u1", 1);
        const res = await db.query(
            "SELECT * FROM favorites WHERE username='u1'");
        expect(res.rows.length).toEqual(0);
    });

    test("No product found", async function () {
        try {
            await Favorite.remove("u1", 2);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** removeAll */

describe("removeAll", function () {
    test("works", async function () {
        await Favorite.removeAll("u1");
        const res = await db.query(
            "SELECT * FROM favorites WHERE username='u1'");
        expect(res.rows.length).toEqual(0);
    });
});
