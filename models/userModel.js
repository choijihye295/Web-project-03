// src/models/userModel.js
const pool = require('../config/dbConfig'); // DB 연결 설정을 import

// 이메일로 사용자 찾기
async function findByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
}

// 사용자 생성
async function create(userData) {
  const { email, passwd, name } = userData;
  const [result] = await pool.query(
    'INSERT INTO Users (email, passwd, name) VALUES (?, ?, ?)', 
    [email, passwd, name]
  );
  return result;
}

// 비밀번호 갱신
async function updatePassword(userId, newPassword) {
  const [result] = await pool.query(
    'UPDATE Users SET passwd = ? WHERE id = ?', 
    [newPassword, userId]
  );
  return result;
}

// 리프레시 토큰 업데이트
async function updateRefreshToken(userId, refreshToken) {
  const [result] = await pool.query(
    'UPDATE Users SET refresh_token = ? WHERE id = ?', 
    [refreshToken, userId]
  );
  return result;
}

// 사용자 정보 업데이트
async function updateById(userId, updates) {
  const { email, name } = updates;
  const [result] = await pool.query(
    'UPDATE Users SET email = ?, name = ? WHERE id = ?',
    [email, name, userId]
  );
  return result;
}

module.exports = {
  findByEmail,
  create,
  updatePassword,
  updateRefreshToken,
  updateById,
};
