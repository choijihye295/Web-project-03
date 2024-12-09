// src/services/authService.js
const bcrypt = require('bcryptjs');  // bcrypt -> bcryptjs로 변경
const User = require('../models/userModel');
const jwtUtil = require('../utils/jwtUtil');

async function authenticateUser(email, password) {
  const user = await User.findByEmail(email);  // User 모델에서 이메일로 사용자 찾기

  if (!user) {
    throw new Error('User not found');
  }

  // 비밀번호 비교
  const passwordMatch = await bcrypt.compare(password, user.passwd);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  return user;
}

async function saveRefreshToken(userId, refreshToken) {
  await User.updateRefreshToken(userId, refreshToken);
}

async function verifyRefreshToken(refreshToken) {
  const decoded = await jwtUtil.verifyRefreshToken(refreshToken);
  return decoded;
}

async function updateRefreshToken(userId, oldRefreshToken) {
  const newRefreshToken = await jwtUtil.generateRefreshToken(userId);
  await User.updateRefreshToken(userId, newRefreshToken);
  return newRefreshToken;
}

async function getUserByEmail(email) {
  return await User.findByEmail(email);
}

async function createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.passwd, 10);
  userData.passwd = hashedPassword;
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
  return await User.updateById(userId, updates);
}

async function logLoginActivity(userId) {
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
  logLoginActivity
};
