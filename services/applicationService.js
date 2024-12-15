const ApplicationModel = require('../models/applicationModel');

class ApplicationService {
    static async apply(applicationData) {
        const { user_id, job_id } = applicationData;
      
        // 중복 지원 체크
        const existingApplication = await ApplicationModel.findByUserAndJob(user_id, job_id);
        if (existingApplication) {
          return {
            status: 'error',
            message: 'You have already applied for this job',
            code: 'DUPLICATE_APPLICATION',
          };
        }
      
        // 지원 저장
        const result = await ApplicationModel.create({ user_id, job_id });
        if (result.affectedRows > 0) {
          return {
            status: 'success',
            applicationId: result.insertId,
          };
        } else {
          return {
            status: 'error',
            message: 'Failed to submit application',
            code: 'INSERT_ERROR',
          };
        }
      }
      

  static async getApplications(user_id) {
    const applications = await ApplicationModel.findByUser(user_id);
    return applications;
  }
  
  static async cancelApplication(user_id, application_id) {
    const application = await ApplicationModel.findById(application_id);
  
    if (!application || application.user_id !== user_id) {
      return {
        status: 'error',
        message: 'Application not found or unauthorized',
        code: 'NOT_FOUND_OR_UNAUTHORIZED',
      };
    }
  
    const result = await ApplicationModel.delete(application_id);
    return result;
  }
  
}

module.exports = ApplicationService;
