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
    product_id VARCHAR(255) PRIMARY KEY,
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
    order_detail_id VARCHAR(255) NOT NULL,
    order_id INTEGER,
    product_id VARCHAR(255),
    quantity INTEGER,
    size VARCHAR(20),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    price DOUBLE NOT NULL,
    subtotal DOUBLE GENERATED ALWAYS AS (quantity * price)
);



-- INSERT EXAMPLE DATA

INSERT INTO customers (email, address, phone_number) VALUES
    ('example1@example.com', 'address1', 1234567892),
    ('example2@example.com', 'address2', 1234567893),
    ('example3@example.com', 'address3', 1234567894);

INSERT INTO products (product_id ,name, price) VALUES
    ('test1','T-shirt', 19.99),
    ('test2','Jeans', 39.99),
    ('test3','Sneakers', 59.99);

INSERT INTO orders (customer_id) VALUES
    (1),
    (2),
    (3);

INSERT INTO order_details (order_detail_id, order_id, product_id, quantity, size, price)
VALUES
    ('hej1', 1, 'test1', 2,'XS', 19.99),
    ('hej2', 2, 'test2', 1,'M', 59.99),
    ('hej3', 3, 'test3', 3,'L', 19.99);





CREATE VIEW all_orders AS
SELECT
    od.order_detail_id,
    o.order_id,
    o.order_date,
    c.customer_id,
    c.email AS customer_email,
    c.address AS customer_address,
    c.phone_number AS customer_phone,
    p.product_id,
    p.name AS product_name,
    od.quantity,
    od.size,
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

    -- Checks if a product already exists
    -- If a product don't exist, it inserts the product_id, product_name, and a default price of 0.0 into the table.
    INSERT INTO products (product_id, name, price)
    SELECT
        DISTINCT product.product_id,
        product.product_name,
        0.0
    FROM
        JSON_TABLE(p_products, '$[*]'
            COLUMNS (
                product_id VARCHAR(255) PATH '$.product_id',
                product_name VARCHAR(100) PATH '$.product_name'
            )
        ) AS product
    LEFT JOIN products p ON product.product_id = p.product_id
    WHERE p.product_id IS NULL;

    -- Insert the order
    INSERT INTO orders (customer_id) VALUES (inserted_customer_id);

    -- Insert order details
    INSERT INTO order_details (order_detail_id, order_id, product_id, quantity, size, price)
    SELECT
        product.order_detail_id,
        LAST_INSERT_ID(),
        product.product_id,
        product.quantity,
        product.size,
        product.product_price
    FROM
        JSON_TABLE(p_products, '$[*]'
            COLUMNS (
                order_detail_id VARCHAR(255) PATH '$.order_detail_id',
                product_id VARCHAR(255) PATH '$.product_id',
                quantity INTEGER PATH '$.quantity',
                size VARCHAR(20) PATH '$.product_size' ,
                product_price DOUBLE PATH '$.product_price'
            )
        ) AS product;
END //



DELIMITER ;

