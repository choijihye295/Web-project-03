const mysql = require('mysql2/promise');

// MySQL 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: '113.198.66.75',        // 클라우드 서버 IP (예: '113.198.66.75')
  user: 'cjh',    // MySQL 사용자 이름
  password: 'fabia8990!',// MySQL 비밀번호
  database: 'saramin_db',// 사용할 데이터베이스 이름
  port: 10089,                // MySQL 서버 포트 (기본은 3306)
  multipleStatements: true    // 여러 SQL문을 하나로 실행할 수 있도록 설정
});

async function executeSQL() {
  const connection = await pool.getConnection();

  // SQL 쿼리: 테이블 삭제 및 생성 SQL
  const sql = `
    -- Drop Tables
    DROP TABLE IF EXISTS Bookmarks;
    DROP TABLE IF EXISTS LoginHistory;
    DROP TABLE IF EXISTS Applications;
    DROP TABLE IF EXISTS Jobs;
    DROP TABLE IF EXISTS Users;

    -- Create Users table
    CREATE TABLE Users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(320) NOT NULL UNIQUE,
      passwd VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      created_time DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Jobs table
    CREATE TABLE Jobs (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      link VARCHAR(255) NOT NULL UNIQUE,
      career VARCHAR(255) NOT NULL,
      education VARCHAR(255) NOT NULL,
      employment_type VARCHAR(255) NOT NULL,
      deadline DATE,
      skill VARCHAR(255),
      salary VARCHAR(255),
      job_field VARCHAR(255),
      view INT NOT NULL DEFAULT 0,
      company_name VARCHAR(255) NOT NULL,
      location_name VARCHAR(255) NOT NULL
    );

    -- Create Applications table
    CREATE TABLE Applications (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      applied_time DATETIME NOT NULL,
      user_id INT NOT NULL,
      job_id INT NOT NULL,
      status VARCHAR(255) DEFAULT 'Applied',  
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE CASCADE
    );

    -- Create Bookmarks table
    CREATE TABLE Bookmarks (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      user_id INT NOT NULL,
      job_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE CASCADE
    );

    -- Create LoginHistory table
    CREATE TABLE LoginHistory (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      login_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      user_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    );
  `;

  try {
    // SQL 실행
    await connection.query(sql);
    console.log("SQL executed successfully: Tables created.");
  } catch (error) {
    console.error("Error executing SQL:", error);
  } finally {
    // 연결 종료
    connection.release();
  }
}

// SQL 실행 함수 호출
executeSQL();
