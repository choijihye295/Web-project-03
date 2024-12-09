const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

// DB 연결 설정
const pool = mysql.createPool({
  host: '113.198.66.75',  // 클라우드 서버 IP
  user: 'cjh',
  password: 'fabia8990!',
  database: 'saramin_db',
  port: 10089,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: false,           // SSL 비활성화
  connectTimeout: 10000 // 연결 타임아웃 증가
});

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 테스트용 API
app.get('/test', async (req, res) => {
    try {
      const connection = await pool.getConnection();
      console.log('Database connection successful');
      
      const [rows] = await connection.query('SELECT 1');
      connection.release();
      
      res.json({ message: 'Connection successful', data: rows });
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ 
        error: error.message,
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage
      });
    }
});

// 데이터베이스의 테이블 목록 가져오기
app.get('/get-schema', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');

    // 데이터베이스 스키마 조회
    const [tables] = await connection.query('SHOW TABLES');
    connection.release();

    res.json({ message: 'Schema retrieved successfully', data: tables });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      error: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
  }
});

// 특정 테이블의 구조와 데이터를 가져오는 API
app.get('/describe-and-data/:tableName', async (req, res) => {
  const { tableName } = req.params;
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');

    // 특정 테이블의 스키마 조회
    const [columns] = await connection.query(`DESCRIBE ${tableName}`);
    console.log(`Table ${tableName} structure retrieved`);

    // 해당 테이블의 모든 데이터 조회
    const [data] = await connection.query(`SELECT * FROM ${tableName}`);
    console.log(`Data from ${tableName} retrieved`);

    connection.release();

    res.json({ 
      message: `Table ${tableName} structure and data retrieved successfully`, 
      structure: columns,
      data: data 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      error: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
  }
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
