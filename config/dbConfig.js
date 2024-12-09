const mysql = require('mysql2/promise');
require('dotenv').config();  // .env 파일을 로드

const pool = mysql.createPool({
  host: process.env.DB_HOST,  // .env에서 읽어온 값
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: false,
  connectTimeout: 10000,
});

module.exports = pool;
