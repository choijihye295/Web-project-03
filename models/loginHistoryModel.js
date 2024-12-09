// src/models/loginHistoryModel.js
const pool = require('../config/dbConfig');

// 로그인 이력 저장
async function createLoginHistory(userId) {
  const query = `
    INSERT INTO LoginHistory (user_id)
    VALUES (?)
  `;
  
  const [result] = await pool.query(query, [userId]);
  return result;
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

module.exports = {
  createLoginHistory,
  getLoginHistoryByUserId
};
