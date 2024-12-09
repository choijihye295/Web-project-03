// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    // 요청 헤더에서 Access Token 추출
    const token = req.headers.authorization.split(' ')[1]; 

    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    // JWT 토큰 검증
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token', error: err.message });
      }

      // 토큰에서 사용자 정보 추출
      req.user = { userId: decoded.userId, email: decoded.email };

      // 인증된 사용자로서 계속해서 요청 처리
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
}

module.exports = {
  verifyToken
};
