const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const path = require('path');

app.use(cors());
app.use(bodyParser.json());

// Serve a pasta frontend inteira
app.use(express.static(path.join(__dirname, "../..", "frontend")));

// Rota para o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../", "../",  "/frontend", "index.html"));
});

// Rotas da API
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

// Mensagem da API no navegador (caso queira, ou remova para evitar redundância)
app.get('/api', (req, res) => {
    res.send('Welcome to Pierre’s Shop API!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
