// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
  try {
    // 요청 헤더에서 Access Token 추출
    const token = req.headers.authorization.split(' ')[1];

    // JWT 토큰 검증
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // 토큰에서 사용자 정보 추출
    req.user = { userId: decoded.userId, email: decoded.email };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
}

module.exports = {
  verifyToken,
};