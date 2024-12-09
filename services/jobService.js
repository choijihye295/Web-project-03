// src/services/jobService.js
const pool = require('../config/dbConfig');

const getJobs = async (queryParams) => {
  const { page = 1, size = 20, sort = 'id', location_name, career, salary, skill, keyword, companyName, job_field } = queryParams;
  const offset = (page - 1) * size;

  let query = `
    SELECT * FROM Jobs
    WHERE 1=1
  `;
  let queryParamsArray = [];

  if (location_name) {
    query += ` AND location_name LIKE ?`;
    queryParamsArray.push(`%${location_name}%`);
  }
  if (career) {
    query += ` AND career LIKE ?`;
    queryParamsArray.push(`%${career}%`);
  }
  if (salary) {
    query += ` AND salary LIKE ?`;
    queryParamsArray.push(`%${salary}%`);
  }
  if (skill) {
    query += ` AND skill LIKE ?`;
    queryParamsArray.push(`%${skill}%`);
  }
  if (keyword) {
    query += ` AND (title LIKE ? OR skill LIKE ? OR employment_type LIKE ? OR job_field LIKE ? OR education LIKE ?)`;
    queryParamsArray.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }
  if (companyName) {
    query += ' AND company_name LIKE ?';
    queryParamsArray.push(`%${companyName}%`);
  }
  if (job_field) {
    query += ' AND job_field LIKE ?';
    queryParamsArray.push(`%${job_field}%`);
  }

  query += ` ORDER BY ${sort} LIMIT ? OFFSET ?`;
  queryParamsArray.push(Number(size), Number(offset));

  const connection = await pool.getConnection();
  const [jobs] = await connection.query(query, queryParamsArray);

  // Count total items for pagination
  const countQuery = 'SELECT COUNT(*) AS total FROM Jobs WHERE 1=1';
  const [countResult] = await connection.query(countQuery, queryParamsArray);
  connection.release();

  const totalItems = countResult[0].total;
  const totalPages = Math.ceil(totalItems / size);

  return {
    status: 'success',
    data: jobs,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems
    }
  };
};

const getJobDetails = async (id) => {
  const connection = await pool.getConnection();
  const [jobDetails] = await connection.query('SELECT * FROM Jobs WHERE id = ?', [id]);
  connection.release();

  if (jobDetails.length === 0) {
    return {
      status: 'error',
      message: 'Job not found',
      code: 'JOB_NOT_FOUND'
    };
  }

  return {
    status: 'success',
    data: jobDetails[0]
  };
};

const postJob = async (jobData) => {
    const {
      title, link, career, education, employment_type, deadline, skill, salary,
      company_name, location_name, job_field
    } = jobData;
  
    const connection = await pool.getConnection();
  
    // 먼저 link가 이미 존재하는지 확인
    const [existingJob] = await connection.query('SELECT * FROM Jobs WHERE link = ?', [link]);
  
    if (existingJob.length > 0) {
      connection.release();
      return {
        status: 'error',
        message: 'Duplicate entry for link. This job is already posted.',
        code: 'DUPLICATE_LINK'
      };
    }
  
    const query = `
      INSERT INTO Jobs (title, link, career, education, employment_type, deadline, skill, salary, company_name, location_name, job_field)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const [result] = await connection.query(query, [
      title, link, career, education, employment_type, deadline || null, skill || '', salary || '',
      company_name, location_name, job_field || ''
    ]);
  
    connection.release();
  
    // result.insertId가 반환되는지 확인
    if (result && result.insertId) {
      return {
        status: 'success',
        data: {
          jobId: result.insertId // 새로 생성된 jobId 반환
        }
      };
    } else {
      return {
        status: 'error',
        message: 'Job posting failed',
        code: 'INSERT_ERROR'
      };
    }
  };
  
  const updateJob = async (id, jobData) => {
    const { title, link, career, education, employment_type, deadline, skill, salary, company_name, location_name, job_field } = jobData;
  
    const connection = await pool.getConnection();
    
    const query = `
      UPDATE Jobs SET
        title = ?, link = ?, career = ?, education = ?, employment_type = ?, deadline = ?, 
        skill = ?, salary = ?, company_name = ?, location_name = ?, job_field = ?
      WHERE id = ?
    `;
    
    try {
      const [result] = await connection.query(query, [
        title, link, career, education, employment_type, deadline || null, skill || '', salary || '',
        company_name, location_name, job_field || '', id
      ]);
  
      console.log('Query executed successfully:', query);
      console.log('Query result:', result);
  
      connection.release();
  
      // 만약 affectedRows가 1이라면 정상적으로 업데이트됨
      if (result.affectedRows > 0) {
        return {
          status: 'success',
          message: 'Job updated successfully'
        };
      } else {
        // affectedRows가 0이면 해당 Job이 존재하지 않음
        throw new Error('Job not found');
      }
    } catch (error) {
      console.error('Error during the query execution:', error);
      connection.release();
      // 예외를 다시 던져서 호출한 곳에서 처리하도록 합니다.
      throw error;
    }
  };
  

  

const deleteJob = async (id) => {
  const connection = await pool.getConnection();
  const query = 'DELETE FROM Jobs WHERE id = ?';

  const [result] = await connection.query(query, [id]);
  connection.release();

  if (result.affectedRows > 0) {
    return {
      status: 'success',
      message: 'Job deleted successfully'
    };
  } else {
    return {
      status: 'error',
      message: 'Job not found',
      code: 'JOB_NOT_FOUND'
    };
  }
};

module.exports = {
  getJobs,
  getJobDetails,
  postJob,
  updateJob,
  deleteJob
};
