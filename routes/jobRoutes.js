/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management API
 */

const express = require('express');
const JobController = require('../controllers/jobController');  // 컨트롤러 연결

const router = express.Router();


/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve all job postings
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of job postings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The job ID
 *                   title:
 *                     type: string
 *                     description: The job title
 *                   company_name:
 *                     type: string
 *                     description: The company name
 *                   location_name:
 *                     type: string
 *                     description: The location of the job
 *                   salary:
 *                     type: string
 *                     description: The salary offered
 */
// 공고 목록 조회
router.get('/', JobController.getJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Retrieve detailed information about a specific job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The job ID
 *     responses:
 *       200:
 *         description: Detailed information about the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 company_name:
 *                   type: string
 *                 location_name:
 *                   type: string
 *                 salary:
 *                   type: string
 *                 details:
 *                   type: string
 *                   description: Additional job details
 *       404:
 *         description: Job not found
 */
// 공고 상세 조회
router.get('/:id', JobController.getJobDetails);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               link:
 *                 type: string
 *               career:
 *                 type: string
 *               education:
 *                 type: string
 *               employment_type:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               skill:
 *                 type: string
 *               salary:
 *                 type: string
 *               company_name:
 *                 type: string
 *               location_name:
 *                 type: string
 *               job_field:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created job
 *       400:
 *         description: Invalid request body
 */
// 공고 등록
router.post('/', JobController.postJob);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job posting
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               link:
 *                 type: string
 *               career:
 *                 type: string
 *               education:
 *                 type: string
 *               employment_type:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *               skill:
 *                 type: string
 *               salary:
 *                 type: string
 *               company_name:
 *                 type: string
 *               location_name:
 *                 type: string
 *               job_field:
 *                 type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 */
// 공고 수정
router.put('/:id', JobController.updateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job posting
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */
// 공고 삭제
router.delete('/:id', JobController.deleteJob);

module.exports = router;
