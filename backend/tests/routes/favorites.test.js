"use strict";

const request = require("supertest");

const app = require("../../app");
const Favorite = require("../../models/favorites")
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /favorites/:id */

describe("GET /favorites/:username", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .get(`/favorites/u1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            favorites: [{
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
            }],
        });
    });

    test("works for admin", async function () {
        const resp = await request(app)
            .get(`/favorites/admin`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            favorites: [],
        });
    });

    test("no products in favorites", async function () {
        const resp = await request(app)
            .get(`/favorites/u2`)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.body).toEqual({
            favorites: [],
        });
    });

    test("unauth for not logged in users", async function () {
        const resp = await request(app)
            .get(`/favorites/u1`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});

/************************************** POST /favorites/:username/:id */

describe("POST /favorites/:username/:id", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .post(`/favorites/u1/2`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            favorites: {
                username: "u1",
                product_id: 2,
            },
        });
    });

    test("product not found", async function () {
        const resp = await request(app)
            .post(`/favorites/u1/4`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            error: {
                "message": "No product found!",
                "status": 404
            }
        });
    });

    test("unauth for not logged in users", async function () {
        const resp = await request(app)
            .post(`/favorites/u1/2`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});

/************************************** DELETE /favorites/:username/:id */

describe("DELETE /favorites/:username/:id", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .delete(`/favorites/u1/1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({ deleted: "1" });
    });

    test("product not found", async function () {
        const resp = await request(app)
            .delete(`/favorites/u1/4`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            error: {
                "message": "No product found!",
                "status": 404
            }
        });
    });

    test("unauth for not logged in users", async function () {
        const resp = await request(app)
            .delete(`/favorites/u1/1`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});

/************************************** DELETE ALL /favorites/:username */

describe("DELETE ALL /favorites/:username", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .delete(`/favorites/u1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({ deleted: "Deleted all products in favorites!" });
    });

    test("unauth for not logged in users", async function () {
        const resp = await request(app)
            .delete(`/favorites/u1`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});
