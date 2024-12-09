// src/services/authService.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwtUtil = require('../utils/jwtUtil');

async function authenticateUser(email, password) {
  const user = await User.findByEmail(email);  // User 모델에서 이메일로 사용자 찾기

  if (user && (await bcrypt.compare(password, user.passwd))) {
    return user;
  }

  return null;
}

async function saveRefreshToken(userId, refreshToken) {
  // 리프레시 토큰 저장: User 모델에서 업데이트 메서드 호출
  await User.updateRefreshToken(userId, refreshToken);
}

async function verifyRefreshToken(refreshToken) {
  // 리프레시 토큰 검증: jwtUtil에서 verify 함수 호출
  const decoded = await jwtUtil.verifyRefreshToken(refreshToken);
  return decoded;
}

async function updateRefreshToken(userId, oldRefreshToken) {
  // 리프레시 토큰 갱신: jwtUtil에서 새 리프레시 토큰 생성
  const newRefreshToken = await jwtUtil.generateRefreshToken(userId);
  // User 모델에서 리프레시 토큰 업데이트
  await User.updateRefreshToken(userId, newRefreshToken);
  return newRefreshToken;
}

async function getUserByEmail(email) {
  // 이메일로 사용자 조회
  return await User.findByEmail(email);
}

async function createUser(userData) {
  // 새로운 사용자 생성
  return await User.create(userData);
}

async function changePassword(userId, oldPassword, newPassword) {
  const user = await User.findById(userId);

  if (!(await bcrypt.compare(oldPassword, user.passwd))) {
    throw new Error('Incorrect old password');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updatePassword(userId, hashedPassword);
}

async function updateUserProfile(userId, updates) {
  // 사용자 프로필 업데이트
  return await User.updateById(userId, updates);
}

async function logLoginActivity(userId) {
  // 로그인 이력 기록 (선택적으로 구현)
  await User.logLoginActivity(userId);
}

module.exports = {
  authenticateUser,
  saveRefreshToken,
  verifyRefreshToken,
  updateRefreshToken,
  getUserByEmail,
  createUser,
  changePassword,
  updateUserProfile,
  logLoginActivity,
};
