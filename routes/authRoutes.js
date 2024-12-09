const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();



router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.put('/profile', authController.updateProfile);

// 로그인 이력 조회 (로그인 후)
router.get('/login-history', verifyToken, authController.getLoginHistory);  // authenticate -> verifyToken

module.exports = router;