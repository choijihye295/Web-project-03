const express = require('express');
const JobController = require('../controllers/jobController');  // 컨트롤러 연결

const router = express.Router();

// 공고 목록 조회
router.get('/', JobController.getJobs);

// 공고 상세 조회
router.get('/:id', JobController.getJobDetails);

// 공고 등록
router.post('/', JobController.postJob);

// 공고 수정
router.put('/:id', JobController.updateJob);

// 공고 삭제
router.delete('/:id', JobController.deleteJob);

module.exports = router;
