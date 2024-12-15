/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: 북마크 관리 API
 */

const express = require('express');
const BookmarkController = require('../controllers/bookmarkController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     summary: 북마크 추가 또는 제거
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_id:
 *                 type: integer
 *                 description: 북마크할 Job의 ID
 *                 example: 5
 *     responses:
 *       200:
 *         description: 북마크가 성공적으로 추가 또는 제거되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Bookmark toggled successfully
 *       401:
 *         description: 인증 실패 (토큰 없음 또는 잘못된 토큰).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     summary: 사용자 북마크 목록 조회
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 북마크 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   job_id:
 *                     type: integer
 *                     example: 5
 *                   created_time:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-12-15T10:00:00.000Z
 *       401:
 *         description: 인증 실패 (토큰 없음 또는 잘못된 토큰).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
// 북마크 추가/제거
router.post('/', verifyToken, BookmarkController.toggleBookmark);

// 북마크 목록 조회
router.get('/', verifyToken, BookmarkController.getBookmarks);

module.exports = router;
