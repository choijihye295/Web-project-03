// routes/api.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const jobsController = require('../controllers/jobsController');

const router = express.Router();

// 인증이 필요한 API 라우트에 verifyToken 미들웨어 적용
router.get('/jobs', authMiddleware.verifyToken, jobsController.getJobs);
router.post('/jobs', authMiddleware.verifyToken, jobsController.createJob);

module.exports = router;