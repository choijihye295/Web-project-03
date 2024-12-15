/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: 지원 관리 API
 */

const express = require('express');
const ApplicationController = require('../controllers/applicationController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: 지원하기
 *     tags: [Applications]
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
 *                 example: 1
 *               resume_url:
 *                 type: string
 *                 example: "http://example.com/resume.pdf"
 *     responses:
 *       200:
 *         description: 지원 성공
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
 *                   example: Application submitted successfully
 *       401:
 *         description: 인증 실패
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */
// 지원하기
router.post('/', verifyToken, ApplicationController.apply);


/**
 * @swagger
 * /applications:
 *   get:
 *     summary: 지원 내역 조회
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: status
 *         in: query
 *         description: 지원 상태 필터
 *         required: false
 *         schema:
 *           type: string
 *           example: "Applied"
 *       - name: sort
 *         in: query
 *         description: 정렬 기준 (예: 날짜별)
 *         required: false
 *         schema:
 *           type: string
 *           example: "applied_time"
 *       - name: order
 *         in: query
 *         description: 정렬 순서 (asc/desc)
 *         required: false
 *         schema:
 *           type: string
 *           example: "desc"
 *     responses:
 *       200:
 *         description: 지원 내역 조회 성공
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
 *                     example: 1
 *                   status:
 *                     type: string
 *                     example: "Applied"
 *                   applied_time:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-15T10:00:00.000Z"
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 에러
 */
// 지원 내역 조회
router.get('/', verifyToken, ApplicationController.getApplications);


/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: 지원 취소
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 취소할 지원 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 지원 취소 성공
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
 *                   example: Application canceled successfully
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 지원 내역을 찾을 수 없음
 *       500:
 *         description: 서버 에러
 */
// 지원 취소
router.delete('/:id', verifyToken, ApplicationController.cancelApplication);

module.exports = router;
