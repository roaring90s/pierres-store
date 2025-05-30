const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/create', async (req, res) => {
    const { name, phone, email, address, total, paymentMethod, products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "No products provided" });
    }

    try {
        // Insert no "orders" com placeholders PostgreSQL
        const result = await db.query(
            `INSERT INTO "orders" (name, phone, email, address, total, paymentmethod) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [name, phone, email, address, total, paymentMethod]
        );

        const orderId = result.rows[0].id;

        const productMap = new Map();

        for (let item of products) {
            if (productMap.has(item.product_id)) {
                productMap.set(item.product_id, productMap.get(item.product_id) + 1);
            } else {
                productMap.set(item.product_id, 1);
            }
        }

        for (let [product_id, quantity] of productMap.entries()) {
            await db.query(
                `INSERT INTO order_product (order_id, product_id, quantity)
                 VALUES ($1, $2, $3)
                 ON CONFLICT (order_id, product_id)
                 DO UPDATE SET quantity = order_product.quantity + EXCLUDED.quantity`,
                [orderId, product_id, quantity]
            );
        }

        await db.query(
            `INSERT INTO receipt (order_id, totalamount) VALUES ($1, $2)`,
            [orderId, total]
        );

        res.json({ message: "Order created successfully!", orderId });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM "orders"`);
        const orders = result.rows;

        if (!orders.length) {
            return res.status(404).json({ error: "No orders found" });
        }

        res.json({ orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/details/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const orderResult = await db.query(
            `SELECT name, phone, email, address, total FROM "orders" WHERE id = $1`,
            [orderId]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        const productsResult = await db.query(`
            SELECT p.name, p.price, op.quantity
            FROM order_product op
            JOIN product p ON op.product_id = p.id
            WHERE op.order_id = $1
        `, [orderId]);

        res.json({
            order: orderResult.rows[0],
            products: productsResult.rows
        });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
