const pool = require('../config/dbConfig');

// 북마크 추가
async function create({ user_id, job_id }) {
  const [result] = await pool.query(
    'INSERT INTO Bookmarks (user_id, job_id) VALUES (?, ?)',
    [user_id, job_id]
  );
  return result;
}

// 사용자와 Job ID로 북마크 조회
async function findByUserAndJob(user_id, job_id) {
  const [rows] = await pool.query(
    'SELECT * FROM Bookmarks WHERE user_id = ? AND job_id = ?',
    [user_id, job_id]
  );
  return rows[0];
}

// 사용자 ID로 북마크 목록 조회
async function findByUser(user_id, limit, offset) {
  const [rows] = await pool.query(
    'SELECT * FROM Bookmarks WHERE user_id = ? ORDER BY created_time DESC LIMIT ? OFFSET ?',
    [user_id, limit, offset]
  );
  return rows;
}

// 사용자와 Job ID로 북마크 삭제
async function deleteByUserAndJob(user_id, job_id) {
  const [result] = await pool.query(
    'DELETE FROM Bookmarks WHERE user_id = ? AND job_id = ?',
    [user_id, job_id]
  );
  return result;
}

module.exports = {
  create,
  findByUserAndJob,
  findByUser,
  deleteByUserAndJob,
};
