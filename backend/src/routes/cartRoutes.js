const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/add', async (req, res) => {
    const { product_id, quantity} = req.body;
    try {
        await db.query("INSERT into cart (product_id, quantity) VALUES (?, ?)", [product_id, quantity]);    
        res.json({ message: "Product added to cart!"});
    }catch (error) {
        res.status(500).json({error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const [cart] = await db.query("SELECT * FROM cart");
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;