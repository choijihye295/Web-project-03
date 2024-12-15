const ApplicationService = require('../services/applicationService');
const { successResponse, errorResponse } = require('../utils/responseUtil');

class ApplicationController {
    static async apply(req, res) {
        try {
          // 인증된 사용자 정보에서 user_id 가져오기
          const user_id = req.user.userId; // 미들웨어에서 설정된 req.user 객체
          const { job_id } = req.body; // 요청 본문에서 job_id 가져오기
      
          // user_id와 job_id 유효성 검사
          if (!user_id || !job_id) {
            return errorResponse(res, 'User ID or Job ID is missing', 'MISSING_DATA');
          }
      
          // 지원 저장 서비스 호출
          const result = await ApplicationService.apply({ user_id, job_id });
      
          // 결과 반환
          if (result.status === 'success') {
            successResponse(res, { message: 'Application submitted successfully', applicationId: result.applicationId });
          } else {
            errorResponse(res, result.message, result.code);
          }
        } catch (error) {
          console.error('Error applying for job:', error);
          errorResponse(res, 'Failed to submit application', 'ERROR_CODE');
        }
      }
      

  static async getApplications(req, res) {
    const { userId } = req.user; // 인증된 사용자 정보
  
    try {
      const applications = await ApplicationService.getApplications(userId);
      successResponse(res, applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      errorResponse(res, 'Failed to fetch applications');
    }
  }
  
  static async cancelApplication(req, res) {
    const { userId } = req.user; // 인증된 사용자 정보
    const { id } = req.params;
  
    try {
      const result = await ApplicationService.cancelApplication(userId, id);
  
      if (result.status === 'error') {
        return errorResponse(res, result.message, result.code);
      }
  
      successResponse(res, { message: 'Application canceled successfully' });
    } catch (error) {
      console.error('Error canceling application:', error);
      errorResponse(res, 'Failed to cancel application');
    }
  }
  
  
}

module.exports = ApplicationController;
