// src/controllers/jobController.js
const JobService = require('../services/jobService');
const { successResponse, errorResponse } = require('../utils/responseUtil');

class JobController {
  
  static async getJobs(req, res) {
    try {
      const jobs = await JobService.getJobs(req.query);
      successResponse(res, jobs, {
        currentPage: req.query.page || 1,
        totalPages: Math.ceil(jobs.length / req.query.size),
        totalItems: jobs.length,
      });
    } catch (error) {
      errorResponse(res, error.message);
    }
  }

  static async getJobDetails(req, res) {
    const { id } = req.params;
    try {
      const jobDetails = await JobService.getJobDetails(id);
      if (!jobDetails) {
        return errorResponse(res, 'Job not found', 'JOB_NOT_FOUND');
      }
      successResponse(res, jobDetails);
    } catch (error) {
      errorResponse(res, error.message);
    }
  }

  static async postJob(req, res) {
    try {
      const result = await JobService.postJob(req.body);
      successResponse(res, { jobId: result.insertId }, null);
    } catch (error) {
      errorResponse(res, error.message);
    }
  }

  static updateJob = async (req, res) => {
    const { id } = req.params;
    const jobData = req.body;
  
    try {
      const result = await JobService.updateJob(id, jobData);
  
      if (result.status === 'success') {
        return res.json({
          status: 'success',
          message: result.message
        });
      } else {
        return res.status(404).json({
          status: 'error',
          message: 'Job not found',
          code: 'JOB_NOT_FOUND'
        });
      }
    } catch (error) {
      console.error('Error updating job:', error);
      return res.status(500).json({
        status: 'error',
        message: error.message,
        code: 'ERROR_CODE'
      });
    }
  }
  

  static deleteJob = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Call the delete service
      const result = await JobService.deleteJob(id);
  
      // If the result has success status, return success response
      if (result.status === 'success') {
        return res.json({
          status: 'success',
          message: 'Job deleted successfully'
        });
      } else {
        // If no rows were affected, return Job not found error
        return res.status(404).json({
          status: 'error',
          message: 'Job not found',
          code: 'JOB_NOT_FOUND'
        });
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      return res.status(500).json({
        status: 'error',
        message: error.message,
        code: 'ERROR_CODE'
      });
    }
  }
  
}

module.exports = JobController;
