
CREATE TABLE buyers
(
    id serial PRIMARY KEY,
    email VARCHAR unique NOT NULL,
    username VARCHAR unique NOT NULL,
    password character varying NOT NULL,
    firebase_id character varying,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE shops (
    id serial PRIMARY KEY,
    firebase_id  VARCHAR ,
    shop_handle VARCHAR unique NOT NULL,
    description VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR unique NOT NULL,
    password VARCHAR unique NOT NULL

);
CREATE TABLE categories (
    name VARCHAR NOT NULL,
    id  serial PRIMARY KEY
);

CREATE TABLE products (
    name VARCHAR NOT NULL ,
    image_url_array VARCHAR NOT NULL,
    shop_id INT REFERENCES shops(id) NOT NULL,
    amount INT NOT NULL,
    specs VARCHAR not NULL,
    id  serial PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP


);
CREATE TABLE orders(
    id  serial PRIMARY KEY,
    buyer_info VARCHAR,
    total_amount int NOT NULL,
    payment_info VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP


);

CREATE TABLE order_item (
   user_id int REFERENCES buyers(id) NOT NULL,
   order_id int REFERENCES orders(id) NOT NULL,
   product_id int REFERENCES products(id) NOT NULL,
   shop_id int REFERENCES shops(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);





ALTER TABLE products ALTER COLUMN specs TYPE json USING specs::json;
