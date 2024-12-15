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

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// API 라우트 연결
app.use('/jobs', jobRoutes);
app.use('/auth', authRoutes);
app.use('/applications', applicationRoutes);
app.use('/bookmarks', bookmarkRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log('Swagger Docs available at http://localhost:17089/api-docs');

// // 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const PORT = 13221; // 포트 17089로 변경
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
// });
