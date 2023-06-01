"use strict";

const request = require("supertest");

const app = require("../../app");
const Cart = require("../../models/cart")
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

/************************************** GET /cart/:id */

describe("GET /cart/:username", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .get(`/cart/u1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            cart: [{
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
            }],
        });
    });

    test("works for admin", async function () {
        const resp = await request(app)
            .get(`/cart/admin`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            cart: [],
        });
    });

    test("no products in cart", async function () {
        const resp = await request(app)
            .get(`/cart/u2`)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.body).toEqual({
            cart: [],
        });
    });

    test("unauth for not logged in users", async function () {
        const resp = await request(app)
            .get(`/cart/u1`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});

/************************************** POST /cart/:username/:id */

describe("POST /cart/:username/:id", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .post(`/cart/u1/2`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            cart: {
                username: "u1",
                product_id: 2,
            },
        });
    });

    test("product not found", async function () {
        const resp = await request(app)
            .post(`/cart/u1/4`)
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
            .post(`/cart/u1/2`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});

/************************************** DELETE /cart/:username/:id */

describe("DELETE /cart/:username/:id", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .delete(`/cart/u1/1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({ deleted: "1" });
    });

    test("product not found", async function () {
        const resp = await request(app)
            .delete(`/cart/u1/4`)
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
            .delete(`/cart/u1/1`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});

/************************************** DELETE ALL /cart/:username */

describe("DELETE ALL /cart/:username", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .delete(`/cart/u1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({ deleted: "Deleted all products in cart!" });
    });

    test("unauth for not logged in users", async function () {
        const resp = await request(app)
            .delete(`/cart/u1`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});

/************************************** POST /cart/:username/:id/increment */

describe("POST /cart/:username/:id/increment", function () {
    test("works for current user", async function () {
        const resp = await request(app)
            .post(`/cart/u1/1/increment`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            cart: {
                username: "u1",
                product_id: 1,
                quantity: 2
            },
        });
    });

    test("product not found", async function () {
        const resp = await request(app)
            .post(`/cart/u1/4/increment`)
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
            .post(`/cart/u1/1/increment`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});

/************************************** POST /cart/:username/:id/decrement */

describe("POST /cart/:username/:id/decrement", function () {
    test("works for current user", async function () {
        const increment = await request(app)
            .post(`/cart/u1/1/increment`)
            .set("authorization", `Bearer ${u1Token}`);

        const resp = await request(app)
            .post(`/cart/u1/1/decrement`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            cart: {
                username: "u1",
                product_id: 1,
                quantity: 1
            },
        });
    });

    test("quantity cannot be lower than 1", async function () {
        const resp = await request(app)
            .post(`/cart/u1/1/decrement`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            error: {
                "message": "Quantity cannot be lower than 1",
                "status": 400
            },
        });
    });

    test("product not found", async function () {
        const resp = await request(app)
            .post(`/cart/u1/4/decrement`)
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
            .post(`/cart/u1/1/decrement`)
        expect(resp.body).toEqual({
            error: {
                "message": "Unauthorized",
                "status": 401
            }
        });
    });
});