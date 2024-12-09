// src/controllers/authController.js
const User = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/responseUtil');
const bcrypt = require('bcryptjs');  // 비밀번호 암호화를 위한 라이브러리
const jwt = require('jsonwebtoken');  // JWT를 위한 라이브러리

class AuthController {
  // 회원가입
  static async register(req, res) {
    const { email, passwd, name } = req.body;
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, 'Invalid email format', 'INVALID_EMAIL');
    }

    // 비밀번호 암호화 (Base64 인코딩은 사용하지 않지만, 안전한 방식으로 암호화)
    const hashedPassword = bcrypt.hashSync(passwd, 10);  // 10은 암호화 강도

    try {
      // 중복된 이메일 검사
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) {
        return errorResponse(res, 'Email already exists', 'EMAIL_EXISTS');
      }

      // 사용자 정보 저장
      const result = await User.createUser(email, hashedPassword, name);
      
      successResponse(res, { message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
      console.error('Error registering user:', error);
      errorResponse(res, error.message);
    }
  }

  // 로그인
  static async login(req, res) {
    const { email, passwd } = req.body;

    try {
      // 이메일로 사용자 조회
      const user = await User.getUserByEmail(email);
      if (!user) {
        return errorResponse(res, 'User not found', 'USER_NOT_FOUND');
      }

      // 비밀번호 비교
      const isValidPassword = bcrypt.compareSync(passwd, user.passwd);
      if (!isValidPassword) {
        return errorResponse(res, 'Invalid password', 'INVALID_PASSWORD');
      }

      // JWT 토큰 발급
      const accessToken = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

      // 로그인 이력 저장 (선택사항)
      // 이력 저장 로직 추가

      successResponse(res, { message: 'Login successful', accessToken });
    } catch (error) {
      console.error('Error logging in:', error);
      errorResponse(res, error.message);
    }
  }

  // 토큰 갱신
  static async refresh(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, 'Refresh token is required', 'MISSING_TOKEN');
    }

    try {
      // Refresh 토큰 검증
      jwt.verify(refreshToken, 'your-secret-key', (err, decoded) => {
        if (err) {
          return errorResponse(res, 'Invalid or expired refresh token', 'INVALID_TOKEN');
        }

        // 새로운 Access 토큰 발급
        const accessToken = jwt.sign({ userId: decoded.userId, email: decoded.email }, 'your-secret-key', { expiresIn: '1h' });

        successResponse(res, { message: 'Access token refreshed', accessToken });
      });
    } catch (error) {
      console.error('Error refreshing token:', error);
      errorResponse(res, error.message);
    }
  }

  // 회원 정보 수정
  static async updateProfile(req, res) {
    const { email, passwd, name } = req.body;
    const { userId } = req.user;  // 미들웨어에서 인증 후 userId가 담겨있다고 가정

    try {
      // 비밀번호 암호화
      const hashedPassword = passwd ? bcrypt.hashSync(passwd, 10) : undefined;

      const result = await User.updateUser(userId, email, hashedPassword, name);

      if (result.affectedRows > 0) {
        successResponse(res, { message: 'Profile updated successfully' });
      } else {
        errorResponse(res, 'User not found', 'USER_NOT_FOUND');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      errorResponse(res, error.message);
    }
  }

  // 회원 탈퇴
  static async deleteAccount(req, res) {
    const { userId } = req.user;  // 인증된 사용자 정보

    try {
      const result = await User.deleteUser(userId);

      if (result.affectedRows > 0) {
        successResponse(res, { message: 'Account deleted successfully' });
      } else {
        errorResponse(res, 'User not found', 'USER_NOT_FOUND');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      errorResponse(res, error.message);
    }
  }
}

module.exports = AuthController;
