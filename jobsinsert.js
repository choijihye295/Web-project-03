const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: '113.198.66.75',
  user: 'cjh',
  password: 'fabia8990!',
  database: 'saramin_db',
  port: 10089,
});

function formatDeadline(deadline) {
  // 마감일에서 날짜만 추출 (예: ~ 12/20(금) -> 2024-12-20)
  const match = deadline.match(/\d{1,2}\/\d{1,2}/);
  if (match) {
    const date = match[0].split('/');
    const year = new Date().getFullYear(); // 현재 연도를 사용
    return `${year}-${date[0].padStart(2, '0')}-${date[1].padStart(2, '0')}`;
  }
  return null; // 변환할 수 없으면 null 반환
}

async function insertDataFromCSV() {
  const connection = await pool.getConnection();  // 연결 풀에서 커넥션 가져오기
  const filePath = './data/jobs_re.csv';  // CSV 파일 경로

  try {
    // 기존 데이터 삭제 (선택 사항)
    await connection.query('DELETE FROM Jobs');
    console.log('All existing data has been deleted.');

    fs.createReadStream(filePath)
      .pipe(csv({ delimiter: ',' }))  // 구분자 설정
      .on('data', async (row) => {
        try {
          // 필드 이름 확인 (헤더가 정확하게 매핑되는지 확인)
          console.log('Row keys:', Object.keys(row)); // CSV에서 읽은 필드들 확인

          const trimmedCompanyName = (row['회사명'] || '').trim();  // 공백 제거
          const trimmedTitle = (row['제목'] || '').trim();
          const trimmedLink = (row['링크'] || '').trim();

          // 마감일 형식 변환
          const formattedDeadline = formatDeadline(row['마감일']);

          // 필수 필드 체크
          console.log(`Trimmed Values: { company_name: '${trimmedCompanyName}', title: '${trimmedTitle}', link: '${trimmedLink}' }`);
          
          if (trimmedCompanyName && trimmedTitle && trimmedLink) {
            // 쿼리 작성
            const query = `
              INSERT INTO Jobs (company_name, title, link, location_name, career, education, employment_type, deadline, job_field, skill, salary)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
              trimmedCompanyName,
              trimmedTitle,
              trimmedLink,
              row['지역'] || '',  // 기본값 빈 문자열
              row['경력'] || '',
              row['학력'] || '',
              row['고용형태'] || '',
              formattedDeadline || null, // 변환된 마감일 값
              row['직무분야'] || '',
              row['사용기술'] || '',
              row['연봉정보'] || ''
            ];

            // 데이터 삽입
            await connection.query(query, values);
            console.log(`Inserted row: ${trimmedTitle}`);
          } else {
            console.log('Skipping row due to missing required data (company_name, title, or link):', row);
          }
        } catch (error) {
          console.error('Error inserting row:', error);
        }
      })
      .on('end', async () => {
        console.log('CSV file processing finished.');
        await connection.release();  // 커넥션 반환
      });
  } catch (error) {
    console.error('Error deleting existing data:', error);
    await connection.release();  // 에러 발생 시 커넥션 반환
  }
}

// 실행
insertDataFromCSV();
