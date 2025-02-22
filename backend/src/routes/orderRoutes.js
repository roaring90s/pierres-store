const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/create', async (req, res) => {
    const { name, phone, email, address, total, paymentMethod, products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "No products provided" });
    }

    try {

        const [{ insertId: orderId }] = await db.query(
            "INSERT INTO `order` (name, phone, email, address, total, paymentMethod) VALUES (?, ?, ?, ?, ?, ?)",
            [name, phone, email, address, total, paymentMethod]
        );

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
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE quantity = quantity + ?`,
                [orderId, product_id, quantity, quantity]
            );
        }

        await db.query(
            "INSERT INTO receipt (order_id, totalAmount) VALUES (?, ?)",
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
        const [orders] = await db.query("SELECT * FROM `order`");

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
        const [orderDetails] = await db.query("SELECT name, phone, email, address, total FROM `order` WHERE id = ?", [orderId]);

        if (!orderDetails.length) {
            return res.status(404).json({ error: "Order not found" });
        }

        const [products] = await db.query(`
            SELECT p.name, p.price, op.quantity
            FROM order_product op
            JOIN product p ON op.product_id = p.id
            WHERE op.order_id = ?`, [orderId]);

        res.json({ 
            order: orderDetails[0], 
            products 
        });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
