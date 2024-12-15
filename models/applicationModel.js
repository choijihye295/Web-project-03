const pool = require('../config/dbConfig');

class ApplicationModel {
  // 특정 사용자와 공고에 대한 지원 내역 확인
  static async findByUserAndJob(user_id, job_id) {
    const [rows] = await pool.query(
      'SELECT * FROM Applications WHERE user_id = ? AND job_id = ?',
      [user_id, job_id]
    );
    return rows[0];
  }

  // 지원 저장
  static async create({ user_id, job_id }) {
    const connection = await pool.getConnection();
    try {
      const query = `INSERT INTO Applications (user_id, job_id, applied_time) VALUES (?, ?, NOW())`;
      const [result] = await connection.query(query, [user_id, job_id]);
      return result;
    } finally {
      connection.release();
    }
  }
  
  

  static async findByUser(user_id) {
    const [rows] = await pool.query(
      'SELECT Applications.*, Jobs.title, Jobs.company_name FROM Applications JOIN Jobs ON Applications.job_id = Jobs.id WHERE Applications.user_id = ? ORDER BY Applications.applied_time DESC',
      [user_id]
    );
    return rows;
  }
  
  static async findById(application_id) {
    const [rows] = await pool.query('SELECT * FROM Applications WHERE id = ?', [application_id]);
    return rows[0];
  }
  
  static async delete(application_id) {
    const [result] = await pool.query('DELETE FROM Applications WHERE id = ?', [application_id]);
    return result.affectedRows > 0;
  }
  
}

module.exports = ApplicationModel;
