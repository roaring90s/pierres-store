const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/create', async (req, res) => {
    const { phone, email, address, total, paymentMethod, products } = req.body;
    try {
        const [order] = await db.query(
            "INSERT INTO orders (phone, email, address, total, paymentMethod) VALUES (?, ?, ?, ?, ?)",
            [phone, email, address, total, paymentMethod]
        );

        const orderId = order.insertId;
        for (let item of products) {
            await db.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [orderId, item.product_id, item.quantity, item.price]
            );
        }

        await db.query(
            "INSERT INTO receipt (order_id, totalAmount) VALUES (?, ?)",
            [orderId, total]
        );

        res.json({ message: "Order created successfully!", orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;