// src/models/userModel.js
const pool = require('../config/dbConfig'); // DB 연결 설정을 import

// 이메일로 사용자 찾기
async function findByEmail(email) {
    try {
      const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
      console.log("User found:", rows);  // 콘솔로 결과를 확인
      return rows.length > 0 ? rows[0] : null; // 이메일이 존재하면 첫 번째 사용자 반환, 없으면 null
    } catch (error) {
      console.error("Error fetching user by email:", error);  // 쿼리 실행 시 에러가 있다면 출력
      throw new Error('Database query error');
    }
  }

// 사용자 생성
async function create(userData) {
  const { email, passwd, name } = userData;
  const [result] = await pool.query(
    'INSERT INTO Users (email, passwd, name) VALUES (?, ?, ?)', 
    [email, passwd, name]
  );
  return result; // 생성된 결과 반환 (insertId를 포함)
}

// 비밀번호 갱신
async function updatePassword(userId, newPassword) {
  const [result] = await pool.query(
    'UPDATE Users SET passwd = ? WHERE id = ?', 
    [newPassword, userId]
  );
  return result; // 갱신된 결과 반환
}

// 리프레시 토큰 업데이트
async function updateRefreshToken(userId, refreshToken) {
  const [result] = await pool.query(
    'UPDATE Users SET refresh_token = ? WHERE id = ?', 
    [refreshToken, userId]
  );
  return result; // 갱신된 결과 반환
}

// 사용자 정보 업데이트
async function updateById(userId, updates) {
  const { email, name } = updates;
  const [result] = await pool.query(
    'UPDATE Users SET email = ?, name = ? WHERE id = ?',
    [email, name, userId]
  );
  return result; // 갱신된 결과 반환
}

module.exports = {
  findByEmail,
  create,
  updatePassword,
  updateRefreshToken,
  updateById,
};
