const jwt = require('jsonwebtoken');

// Access Token 생성
function generateAccessToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}

// Refresh Token 생성
function generateRefreshToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
}

async function verifyAccessToken(token) {
    try {
         // .env에서 비밀 키 로드 비밀키 정의되지 않은 경우
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is not defined');
      }
      console.log('Secret Key:', process.env.JWT_SECRET_KEY);  // 비밀 키 확인
      console.log('Token:', token);  // 토큰 확인


      // 토큰 검증
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decoded;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      throw error;
    }
  }
  
  async function verifyRefreshToken(token) {
    try {
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY is not defined');
      }
      return await jwt.verify(token, process.env.JWT_SECRET_KEY);  // 비밀 키 전달
    } catch (error) {
      throw error;
    }
  }
  

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
