const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  ssl: {
    rejectUnauthorized: false // necessário no Render
  }
});

module.exports = pool;
