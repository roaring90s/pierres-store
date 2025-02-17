const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Adicionar produto ao carrinho
router.post('/add', async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    try {
        // Primeiro, verifique se o carrinho existe, caso contrário crie um novo carrinho
        const [cart] = await db.query("SELECT * FROM cart WHERE id = ?", [cart_id]);
        if (!cart.length) {
            // Se o carrinho não existir, crie um novo (opcional, dependendo da sua lógica)
            await db.query("INSERT INTO cart (total) VALUES (0)");
            const [newCart] = await db.query("SELECT LAST_INSERT_ID()");
            cart_id = newCart[0]['LAST_INSERT_ID()'];
        }

        // Verificar se o produto já existe no carrinho
        const [existingProduct] = await db.query("SELECT * FROM cart_product WHERE cart_id = ? AND product_id = ?", [cart_id, product_id]);
        if (existingProduct.length) {
            // Se o produto já estiver no carrinho, apenas atualize a quantidade
            await db.query("UPDATE cart_product SET quantity = quantity + ? WHERE cart_id = ? AND product_id = ?", [quantity, cart_id, product_id]);
        } else {
            // Se o produto não estiver no carrinho, insira um novo
            await db.query("INSERT INTO cart_product (cart_id, product_id, quantity) VALUES (?, ?, ?)", [cart_id, product_id, quantity]);
        }

        res.json({ message: "Product added to cart!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obter todos os produtos do carrinho
router.get('/:cart_id', async (req, res) => {
    const { cart_id } = req.params;
    try {
        // Buscar os produtos do carrinho
        const [cartProducts] = await db.query(`
            SELECT p.name, p.price, cp.quantity 
            FROM cart_product cp
            JOIN product p ON cp.product_id = p.id
            WHERE cp.cart_id = ?
        `, [cart_id]);

        if (cartProducts.length === 0) {
            return res.status(404).json({ error: "No products found in this cart" });
        }

        res.json(cartProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
