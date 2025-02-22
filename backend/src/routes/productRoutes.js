const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para filtrar produtos por estação
router.get('/:season', productController.getProductsBySeason); 

module.exports = router;
