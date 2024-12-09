const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');  // 라우트 파일 임포트
const authRoutes = require('./routes/authRoutes');  // authRoutes 추가

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// API 라우트 연결
app.use('/jobs', jobRoutes);
app.use('/auth', authRoutes);

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
