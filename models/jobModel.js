// models/jobModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // DB 연결 설정

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  career: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  education: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employment_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  skill: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_field: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Job;
