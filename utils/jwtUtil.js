// jwtUtil.js
const jwt = require('jsonwebtoken');

function generateAccessToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

async function verifyAccessToken(token) {
  try {
    return await jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    throw error;
  }
}

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