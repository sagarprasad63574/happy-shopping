"use strict";

const request = require("supertest");

const app = require("../../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /products */

describe("POST /products", function () {
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

    test("ok for admin", async function () {
        const resp = await request(app)
            .post("/products")
            .send(newProduct)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            product: {
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
        });
    });

    test("unauth for non-admin", async function () {
        const resp = await request(app)
            .post("/products")
            .send(newProduct)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("bad request with missing data", async function () {
        const resp = await request(app)
            .post("/products")
            .send({
                id: 100,
                title: "new product",
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request with invalid data", async function () {
        const resp = await request(app)
            .post("/products")
            .send({
                ...newProduct,
                title: 1,
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
});

/************************************** GET /products */

describe("GET /products", function () {
    test("ok for anon", async function () {
        const resp = await request(app).get("/products");
        expect(resp.body).toEqual({
            products:
                [
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
                ],
        });
    });

    test("works: filtering", async function () {
        const resp = await request(app)
            .get("/products")
            .query({ min: 900 });
        expect(resp.body).toEqual({
            products: [
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
            ],
        });
    });

    test("works: filtering on all filters", async function () {
        const resp = await request(app)
            .get("/products")
            .query({ title: 'Samsung Universe 9', category: 'smartphones', min: 900, max: 1300 });
        expect(resp.body).toEqual({
            products: [
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
            ],
        });
    });

    test("bad request if invalid filter key", async function () {
        const resp = await request(app)
            .get("/products")
            .query({ title: 'iPhone 9', nope: "nope" });
        expect(resp.statusCode).toEqual(400);
    });
});

/************************************** GET /products/:id */

describe("GET /products/:id", function () {
    test("works for anon", async function () {
        const resp = await request(app).get(`/products/1`);
        expect(resp.body).toEqual({
            product: {
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
        });
    });

    test("not found for no such product", async function () {
        const resp = await request(app).get(`/products/4`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PATCH /products/:id */

describe("PATCH /products/:id", function () {
    test("works for admin", async function () {
        const resp = await request(app)
            .patch(`/products/1`)
            .send({
                title: "iPhone 10",
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            product: {
                id: 1,
                title: "iPhone 10",
                description: "An apple mobile which is nothing like apple",
                price: 549,
                discountpercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: "Apple",
                category: "smartphones",
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
            },
        });
    });

    test("unauth for non-admin", async function () {
        const resp = await request(app)
            .patch(`/products/1`)
            .send({
                title: "iPhone 10",
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .patch(`/products/1`)
            .send({
                title: "iPhone 10",
            });
        expect(resp.statusCode).toEqual(401);
    });

    test("not found on no such product", async function () {
        const resp = await request(app)
            .patch(`/products/4`)
            .send({
                title: "iPhone 10",
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(404);
    });

    test("bad request on id change attempt", async function () {
        const resp = await request(app)
            .patch(`/products/1`)
            .send({
                id: 4,
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });

    test("bad request on invalid data", async function () {
        const resp = await request(app)
            .patch(`/products/1`)
            .send({
                title: 1,
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
});

/************************************** DELETE /products/:id */

describe("DELETE /products/:id", function () {
    test("works for admin", async function () {
        const resp = await request(app)
            .delete(`/products/1`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({ deleted: "1" });
    });

    test("unauth for non-admin", async function () {
        const resp = await request(app)
            .delete(`/products/1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .delete(`/products/1`);
        expect(resp.statusCode).toEqual(401);
    });

    test("not found for no such product", async function () {
        const resp = await request(app)
            .delete(`/products/4`)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(404);
    });
});