DROP DATABASE IF EXISTS web_shop;
CREATE DATABASE IF NOT EXISTS web_shop;
USE web_shop;

CREATE TABLE customers (
    customer_id INTEGER AUTO_INCREMENT PRIMARY KEY UNIQUE ,
    email VARCHAR(100) NOT NULL UNIQUE ,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL

);

CREATE TABLE products (
    product_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DOUBLE NOT NULL
);

CREATE TABLE orders (
    order_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    customer_id INTEGER,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_details (
    order_detail_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    price DOUBLE NOT NULL,
    subtotal DOUBLE GENERATED ALWAYS AS (quantity * price)
);


-- INSERT EXAMPLE DATA

INSERT INTO customers (email, address, phone_number) VALUES
    ('exempel@exampel.com', 'exempel adress 123', 1234567892),
    ('exempel@exampel.com', 'exempel adress 123', 1234567893),
    ('exempel@exampel.com', 'exempel adress 123', 1234567894);

INSERT INTO products (name, price) VALUES
    ('T-shirt', 19.99),
    ('Jeans', 39.99),
    ('Sneakers', 59.99);

INSERT INTO orders (customer_id) VALUES
    (1),
    (2),
    (3);

INSERT INTO order_details (order_id, product_id, quantity, price) VALUES
    (1, 1, 2, 19.99),
    (2, 3, 1, 59.99),
    (3, 1, 3, 19.99);




CREATE VIEW all_orders AS
SELECT
    o.order_id,
    o.order_date,
    c.customer_id,
    c.email AS customer_email,
    c.address AS customer_address,
    c.phone_number AS customer_phone,
    p.product_id,
    p.name AS product_name,
    od.quantity,
    od.price AS product_price,
    od.subtotal
FROM
    orders o
JOIN
    customers c ON o.customer_id = c.customer_id
JOIN
    order_details od ON o.order_id = od.order_id
JOIN
    products p ON od.product_id = p.product_id;


-- CREATE PROCEDURES

DELIMITER //

CREATE PROCEDURE GetOrders()
BEGIN
    SELECT * FROM all_orders;
END //

CREATE PROCEDURE CreateOrder(
    IN p_customer_email VARCHAR(100),
    IN p_customer_address VARCHAR(255),
    IN p_customer_phone_number VARCHAR(20),
    IN p_products JSON
)
BEGIN
    DECLARE inserted_customer_id INTEGER;

    -- Insert/update new customer or get existing customer ID
    INSERT INTO customers (email, address, phone_number)
    VALUES (p_customer_email, p_customer_address, p_customer_phone_number)
    ON DUPLICATE KEY UPDATE customer_id = LAST_INSERT_ID(customer_id);

    -- Get the customer ID
    SELECT customer_id INTO inserted_customer_id
    FROM customers
    WHERE email = p_customer_email;

    -- Insert the order
    INSERT INTO orders (customer_id) VALUES (inserted_customer_id);

    -- Insert products
    INSERT INTO order_details (order_id, product_id, quantity, price)
    SELECT
        LAST_INSERT_ID(),
        product.product_id,
        product.quantity,
        product.product_price
    FROM
        JSON_TABLE(p_products, '$[*]'
            COLUMNS (
                product_id INT PATH '$.product_id',
                quantity INT PATH '$.quantity',
                product_price DOUBLE PATH '$.product_price'
            )
        ) AS product;
END //

DELIMITER ;

