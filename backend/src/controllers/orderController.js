const db = require('../models/db');

const createOrder = async (req, res) => {
    const { name, phone, email, address, total, paymentMethod, products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: "No products provided" });
    }

    try {
        const result = await db.query(
            `INSERT INTO "orders" (name, phone, email, address, total, "paymentMethod")
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [name, phone, email, address, total, paymentMethod]
        );

        const orderId = result.rows[0].id;
        console.log("Order ID:", orderId);

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
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createOrder };
