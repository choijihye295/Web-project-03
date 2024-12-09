// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // DB 연결 설정을 import

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: false,
    unique: true
  },
  passwd: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  created_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Users',
  timestamps: false, // createdAt과 updatedAt을 사용하지 않기 위해 false 설정
  createdAt: 'created_time', // createdAt을 created_time으로 설정
  updatedAt: false // updatedAt을 비활성화
});

// 테이블 동기화
sequelize.sync()
  .then(() => console.log("Users table has been synced"))
  .catch((error) => console.log("Error syncing Users table:", error));

module.exports = User;
