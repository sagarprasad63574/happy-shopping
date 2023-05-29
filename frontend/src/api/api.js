import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class HappyShoppingApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${HappyShoppingApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get products (filtered by title and category if not undefined) */

    static async getProducts(title) {
        let res = await this.request("products", { title });
        return res.products;
    }

    /** Get products (filtered by title and category if not undefined) */

    static async getProductsCategory(category) {
        let res = await this.request("products", { category });
        return res.products;
    }

    /** Get products in cart */

    static async getProductsInCart(username) {
        let res = await this.request(`cart/${username}`, {}, "get");;
        return res.cart;
    }

    /** Add a product in cart */

    static async addProductToCart(username, id) {
        await this.request(`cart/${username}/${id}`, {}, "post");
    }

    /** Increment quantity in cart */

    static async incrementQuantity(username, id) {
        await this.request(`cart/${username}/${id}/increment`, {}, "post");
    }

    /** Decrement quantity in cart */

    static async decrementQuantity(username, id) {
        await this.request(`cart/${username}/${id}/decrement`, {}, "post");
    }

    /** Get products in favorites */

    static async getProductsInFavorites(username) {
        let res = await this.request(`favorites/${username}`, {}, "get");;
        return res.favorites;
    }

    /** Add a product in favorites */

    static async addProductToFavorites(username, id) {
        await this.request(`favorites/${username}/${id}`, {}, "post");
    }

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for site. */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save user profile page. */

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }
}

export default HappyShoppingApi;