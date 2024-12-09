// src/config/dbConfig.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '113.198.66.75',  
  user: 'cjh',
  password: 'fabia8990!',
  database: 'saramin_db',
  port: 10089,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: false,
  connectTimeout: 10000,
});

module.exports = pool;