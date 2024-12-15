const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '113.198.66.75',
  user: 'cjh',
  password: 'fabia8990!',
  database: 'saramin_db',
  port: 10221,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL!');
    connection.release();
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
}

testConnection();