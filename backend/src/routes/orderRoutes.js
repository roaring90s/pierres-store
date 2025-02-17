const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/create', async (req, res) => {
    const { phone, email, address, total, paymentMethod, products } = req.body;
    try {
        // Inserir o pedido na tabela 'order'
        const [order] = await db.query(
            "INSERT INTO `order` (phone, email, address, total, paymentMethod) VALUES (?, ?, ?, ?, ?)",
            [phone, email, address, total, paymentMethod]
        );

        const orderId = order.insertId;

        // Verificar e adicionar os itens do pedido
        for (let item of products) {
            // Verificar se o produto existe e se há estoque suficiente
            const [product] = await db.query("SELECT * FROM product WHERE id = ?", [item.product_id]);
            if (!product.length) {
                return res.status(400).json({ error: `Product with id ${item.product_id} not found` });
            }

            if (product[0].stock < item.quantity) {
                return res.status(400).json({ error: `Not enough stock for product ${item.product_id}` });
            }

            // Inserir o item no pedido
            await db.query(
                "INSERT INTO order_product (order_id, product_id, quantity) VALUES (?, ?, ?)",
                [orderId, item.product_id, item.quantity]
            );

            // Atualizar o estoque após a compra
            await db.query(
                "UPDATE product SET stock = stock - ? WHERE id = ?",
                [item.quantity, item.product_id]
            );
        }

        // Inserir o recibo
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
