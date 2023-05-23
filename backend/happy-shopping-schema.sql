CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price FLOAT NOT NULL,
    discountPercentage FLOAT NOT NULL,
    rating FLOAT NOT NULL,
    stock INTEGER,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    thumbnail TEXT NOT NULL
);

CREATE TABLE images (
    id INTEGER REFERENCES products on DELETE CASCADE,
    image_url TEXT
);

CREATE TABLE cart (
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    product_id INTEGER REFERENCES products ON DELETE CASCADE,
    PRIMARY KEY (username, product_id)
);

CREATE TABLE favorites (
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    product_id INTEGER REFERENCES products ON DELETE CASCADE,
    PRIMARY KEY (username, product_id)
);