const bcrypt = require("bcrypt");

const db = require("../../db.js");
const { BCRYPT_WORK_FACTOR } = require("../../config.js");
const cart = [];
const favorites = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM products");

  await db.query("DELETE FROM users");

  const products = await db.query(`
  INSERT INTO products(id,
                    title,
                    description,
                    price,
                    discountPercentage,
                    rating,
                    stock,
                    brand,
                    category,
                    thumbnail)
  VALUES (1, 'iPhone 9', 'An apple mobile which is nothing like apple',  
          549, 12.96, 4.69, 94, 'Apple', 'smartphones', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'),
         (2, 'iPhone X', 'SIM-Free,  Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', 
          899, 17.94, 4.44, 34, 'Apple', 'smartphones', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'), 
         (3, 'Samsung Universe 9', 'Samsung new variant which goes beyond Galaxy to the Universe', 
          1249, 15.46, 4.09, 36, 'Samsung', 'smartphones', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg')
  RETURNING id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail`);
  cart.splice(0, 0, ...products.rows.map(p => p.id));
  favorites.splice(0, 0, ...products.rows.map(p => p.id));

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]);

  await db.query(`
    INSERT INTO cart(username, product_id)
    VALUES ('u1', $1)`,
    [cart[0]]);

  await db.query(`
    INSERT INTO favorites(username, product_id)
    VALUES ('u1', $1)`,
    [favorites[0]]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  cart,
  favorites
};