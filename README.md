# 구인구직 웹서비스

Node.js, Express, MySQL을 사용한 구인구직 웹 서비스입니다.

## 주요 기능

- JWT를 이용한 사용자 인증
- 채용공고 CRUD 기능
- CSV 데이터 가져오기
- Swagger를 이용한 API 문서화
- bcrypt를 이용한 비밀번호 암호화
- 북마크 기능
- 지원 이력 관리
- 로그인 이력 관리

## 개발 환경

- Node.js (v20.18.0 이상)
- MySQL Server
- npm

## 사용된 패키지

- **Express**: 웹 애플리케이션 프레임워크
- **MySQL2**: Node.js용 MySQL 클라이언트
- **Sequelize**: 데이터베이스 ORM
- **bcrypt/bcryptjs**: 비밀번호 해싱
- **jsonwebtoken**: JWT 인증
- **dotenv**: 환경 변수 관리
- **cors**: CORS 관리
- **csv-parser**: CSV 파일 파싱
- **swagger-jsdoc/swagger-ui-express**: API 문서화



## 설치 방법

1. 저장소 클론:
```bash
git clone https://github.com/choijihye295/streamlit_dash_app.git
cd wsd-assignment-03
```

2. 패키지 설치:
```bash
npm install
```

3. 루트 디렉토리에 `.env` 파일 생성:
```env
JWT_SECRET_KEY=your_secret_key
DB_HOST=113.198.66.75
DB_USER=cjh
DB_PASSWORD= 받은 password
DB_NAME=saramin_db
DB_PORT=10221
PORT=13221
HOST=113.198.66.75
```


## 데이터베이스 구조

### Users 테이블
```sql
CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(320) NOT NULL UNIQUE,
  passwd VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_time DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Jobs 테이블
```sql
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
```

### Applications 테이블 (지원 이력)
```sql
CREATE TABLE Applications (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  applied_time DATETIME NOT NULL,
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  status VARCHAR(255) DEFAULT 'Applied',  
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE CASCADE
);
```

### Bookmarks 테이블 (북마크)
```sql
CREATE TABLE Bookmarks (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE CASCADE
);
```

### LoginHistory 테이블 (로그인 이력)
```sql
CREATE TABLE LoginHistory (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  login_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
```
## API 엔드포인트

### Auth (인증)
- **회원가입**
  - `POST /auth/register`
  - Body: `{ email, passwd, name }`

- **로그인**
  - `POST /auth/login`
  - Body: `{ email, passwd }`

- **토큰 갱신**
  - `POST /auth/refresh`
  - Body: `{ refreshToken }`

- **프로필 수정**
  - `PUT /auth/profile`
  - Header: `Authorization: Bearer {token}`
  - Body: `{ email, passwd, name }`

- **로그인 이력 조회**
  - `GET /auth/login-history`
  - Header: `Authorization: Bearer {token}`

### Jobs (채용공고)
- **채용공고 목록 조회**
  - `GET /jobs`
  
- **채용공고 상세 조회**
  - `GET /jobs/{id}`

- **채용공고 등록**
  - `POST /jobs`
  - Body: `{ title, link, career, education, employment_type, deadline, skill, salary, company_name, location_name, job_field }`

- **채용공고 수정**
  - `PUT /jobs/{id}`
  - Body: `{ title, link, career, education, employment_type, deadline, skill, salary, company_name, location_name, job_field }`

- **채용공고 삭제**
  - `DELETE /jobs/{id}`

### Applications (지원)
- **지원하기**
  - `POST /applications`
  - Header: `Authorization: Bearer {token}`
  - Body: `{ job_id, resume_url }`

- **지원 내역 조회**
  - `GET /applications`
  - Header: `Authorization: Bearer {token}`
  - Query Parameters:
    - `status`: 지원 상태 필터
    - `sort`: 정렬 기준
    - `order`: 정렬 순서 (asc/desc)

- **지원 취소**
  - `DELETE /applications/{id}`
  - Header: `Authorization: Bearer {token}`

### Bookmarks (북마크)
- **북마크 추가/제거**
  - `POST /bookmarks`
  - Header: `Authorization: Bearer {token}`
  - Body: `{ job_id }`

- **북마크 목록 조회**
  - `GET /bookmarks`
  - Header: `Authorization: Bearer {token}`

### 응답 형식
모든 API는 다음과 같은 기본 응답 형식을 따릅니다:

**성공 응답**
```json
{
  "status": "success",
  "data": { }
}
```

**에러 응답**
```json
{
  "status": "error",
  "message": "에러 메시지"
}
```

### 인증
- 대부분의 API는 JWT 인증이 필요합니다.
- 인증이 필요한 API는 요청 헤더에 `Authorization: Bearer {token}` 형식으로 토큰을 포함해야 합니다.
- 토큰은 로그인 시 발급됩니다.

## 실행 방법

1. 서버 실행:
```bash
node app.js
```

2. API 문서 접속:
```
http://113.198.66.75:13221/api-docs/
```

## 기타 정보

- API 문서는 Swagger를 통해 제공됩니다.
- 보안을 위해 환경 변수를 사용합니다.
- 모든 비밀번호는 암호화되어 저장됩니다.

## 문제 해결

- 데이터베이스 연결 오류 시 .env 파일의 설정을 확인해주세요.
- 패키지 설치 오류 시 Node.js 버전을 확인해주세요.
- API 요청 오류 시 로그를 확인해주세요.

## 작성자

최지혜