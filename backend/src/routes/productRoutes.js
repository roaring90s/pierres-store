const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
    try {
        const [products] = await db.query("SELECT * FROM product");
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'We could not get products' });
    }
});

// Rota para filtrar produtos por estação
router.get('/:season', async (req, res) => {
    const { season } = req.params;
    
    // Validação para aceitar apenas as seasons corretas
    const validSeasons = ['spring', 'summer', 'autumn', 'winter'];
    if (!validSeasons.includes(season.toLowerCase())) {
      return res.status(400).json({ error: "Invalid season" });
    }
  
    try {
      const [products] = await db.execute(
        'SELECT * FROM product WHERE season = ?',
        [season]
      );
      
      if (products.length === 0) {
        return res.status(404).json({ error: "No products found for this season" });
      }
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;