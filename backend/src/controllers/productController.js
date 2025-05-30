const db = require('../models/db');

// Rota para buscar produtos filtrados por estação
const getProductsBySeason = async (req, res) => {
  const { season } = req.params;

  const validSeasons = ['spring', 'summer', 'autumn', 'winter'];
  if (!validSeasons.includes(season)) {
    return res.status(400).json({ error: "Invalid season" });
  }

  try {
    const result = await db.query('SELECT * FROM product WHERE season = $1', [season]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductsBySeason };
