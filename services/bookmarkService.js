const BookmarkModel = require('../models/bookmarkModel');

class BookmarkService {
  // 북마크 추가/제거
  static async toggleBookmark(user_id, job_id) {
    const existingBookmark = await BookmarkModel.findByUserAndJob(user_id, job_id);

    if (existingBookmark) {
      // 이미 존재하면 북마크 삭제
      await BookmarkModel.deleteByUserAndJob(user_id, job_id);
      return { message: 'Bookmark removed', job_id };
    } else {
      // 존재하지 않으면 북마크 추가
      await BookmarkModel.create({ user_id, job_id });
      return { message: 'Bookmark added', job_id };
    }
  }

  // 북마크 목록 조회
  static async getBookmarks(user_id, page, limit) {
    const offset = (page - 1) * limit;
    const bookmarks = await BookmarkModel.findByUser(user_id, limit, offset);

    return bookmarks;
  }
}

module.exports = BookmarkService;
