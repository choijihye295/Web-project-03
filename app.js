require('dotenv').config(); // .env 파일 로드

const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');  // 채용공고 라우트
const authRoutes = require('./routes/authRoutes');  // 회원관리 인증 라우트
const applicationRoutes = require('./routes/applicationRoutes'); //지원관리 라우트
const bookmarkRoutes = require('./routes/bookmarkRoutes'); // 북마크 라우트 추가

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerOptions');

const app = express();

// CORS 설정 (기본 설정을 구체화)
app.use(cors({
    origin: '*', // 모든 도메인 허용 (운영 환경에서는 특정 도메인만 허용 권장)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용되는 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'] // 허용되는 헤더
}));

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// API 라우트 연결
app.use('/jobs', jobRoutes);
app.use('/auth', authRoutes);
app.use('/applications', applicationRoutes);
app.use('/bookmarks', bookmarkRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log('Swagger Docs available at http://localhost:13221/api-docs');

// // 서버 시작
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const PORT = 13221; 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
