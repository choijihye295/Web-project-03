// jwtUtil.js
const jwt = require('jsonwebtoken');

// Access token 생성
function generateAccessToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
}

// Refresh token 생성
function generateRefreshToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

// Access token 검증
async function verifyAccessToken(token) {
  try {
    return await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    throw error;
  }
}

// Refresh token 검증
async function verifyRefreshToken(token) {
  try {
    return await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
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
