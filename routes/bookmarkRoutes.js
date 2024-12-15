const express = require('express');
const BookmarkController = require('../controllers/bookmarkController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// 북마크 추가/제거
router.post('/', verifyToken, BookmarkController.toggleBookmark);

// 북마크 목록 조회
router.get('/', verifyToken, BookmarkController.getBookmarks);

module.exports = router;
