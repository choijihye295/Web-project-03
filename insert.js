const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 연결 테스트 함수
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

// 마감일 형식 변환 함수
function formatDeadline(deadline) {
  if (!deadline || typeof deadline !== 'string') return null;
  const match = deadline.match(/\d{1,2}\/\d{1,2}/);
  if (match) {
    const [month, day] = match[0].split('/');
    const year = new Date().getFullYear();
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return null;
}

// CSV 데이터를 MySQL에 삽입
async function insertDataFromCSV() {
  const connection = await pool.getConnection();
  const filePath = './data/jobs_re.csv';

  try {
    // 기존 데이터 삭제
    await connection.query('DELETE FROM Jobs');
    console.log('기존 데이터 삭제 완료.');

    // CSV 파일 읽기 및 삽입
    fs.createReadStream(filePath)
      .pipe(
        csv({
          headers: [
            'company_name',
            'title',
            'link',
            'location_name',
            'career',
            'education',
            'employment_type',
            'deadline',
            'job_field',
            'skill',
            'salary',
          ],
          skipLines: 1  // 첫 번째 줄(헤더) 건너뛰기
        })
      )
      .on('data', async (row) => {
        try {
          // 필수 데이터 확인
          const companyName = row['company_name']?.trim();
          const title = row['title']?.trim();
          const link = row['link']?.trim();
          const locationName = row['location_name']?.trim();

          if (companyName && title && link && locationName) {
            // 마감일 포맷팅
            const formattedDeadline = formatDeadline(row['deadline']);

            // SQL 쿼리와 값
            const query = `
              INSERT INTO Jobs (company_name, title, link, location_name, career, education, employment_type, deadline, job_field, skill, salary)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
              companyName,
              title,
              link,
              locationName,
              row['career'] || '',
              row['education'] || '',
              row['employment_type'] || '',
              formattedDeadline,
              row['job_field'] || '',
              row['skill'] || '',
              row['salary'] || '',
            ];

            // 데이터 삽입
            await connection.query(query, values);
            console.log(`삽입 성공: ${title}`);
          } else {
            console.log('필수 데이터 누락으로 행 건너뜀:', row);
          }
        } catch (error) {
          console.error('삽입 중 오류 발생:', error);
          console.error('오류가 발생한 데이터:', row);
        }
      })
      .on('end', async () => {
        console.log('CSV 처리 완료.');
        connection.release();
      });
  } catch (error) {
    console.error('에러 발생:', error);
    connection.release();
  }
}

// 데이터 삽입 함수 실행
insertDataFromCSV();