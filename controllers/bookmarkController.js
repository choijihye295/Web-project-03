const BookmarkService = require('../services/bookmarkService');
const { successResponse, errorResponse } = require('../utils/responseUtil');

class BookmarkController {
  // 북마크 추가/제거 (토글)
  static async toggleBookmark(req, res) {
    try {
      const userId = req.user.userId; // 인증된 사용자 ID
      const { job_id } = req.body;

      const result = await BookmarkService.toggleBookmark(userId, job_id);

      successResponse(res, result);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      errorResponse(res, error.message);
    }
  }

  // 북마크 목록 조회
  static async getBookmarks(req, res) {
    try {
      const userId = req.user.userId; // 인증된 사용자 ID
      const { page = 1, limit = 10 } = req.query;

      const result = await BookmarkService.getBookmarks(userId, page, limit);

      successResponse(res, result);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      errorResponse(res, error.message);
    }
  }
}

module.exports = BookmarkController;
