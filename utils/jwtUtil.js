const jwt = require('jsonwebtoken');

function generateAccessToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });  // 비밀키 확인
}

function generateRefreshToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });  // 비밀키 확인
}

async function verifyAccessToken(token) {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET_KEY);  // 비밀키 확인
  } catch (error) {
    throw error;
  }
}

async function verifyRefreshToken(token) {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET_KEY);  // 비밀키 확인
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
