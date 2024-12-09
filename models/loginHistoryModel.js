// src/models/loginHistoryModel.js
const pool = require('../config/dbConfig');

// 로그인 이력 저장
async function create(loginData) {
    const { user_id, login_time } = loginData;
    const [result] = await pool.query(
      'INSERT INTO LoginHistory (user_id, login_time) VALUES (?, ?)',
      [user_id, login_time]
    );
    return result;  // 생성된 결과 반환 (insertId를 포함)
  }

// 로그인 이력 조회
async function getLoginHistoryByUserId(userId) {
  const query = `
    SELECT * FROM LoginHistory
    WHERE user_id = ?
    ORDER BY login_time DESC
  `;
  
  const [history] = await pool.query(query, [userId]);
  return history;
}

// 특정 사용자에 대한 로그인 이력 조회
async function getLoginHistoryByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM LoginHistory WHERE user_id = ? ORDER BY login_time DESC', [userId]);
    return rows;  // 로그인 이력 반환
  }

module.exports = {
  create,
  getLoginHistoryByUserId
};
