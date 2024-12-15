const express = require('express');
const ApplicationController = require('../controllers/applicationController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// 지원하기
router.post('/', verifyToken, ApplicationController.apply);

// 지원 내역 조회
router.get('/', verifyToken, ApplicationController.getApplications);

// 지원 취소
router.delete('/:id', verifyToken, ApplicationController.cancelApplication);

module.exports = router;
