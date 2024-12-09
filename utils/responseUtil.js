// src/utils/responseUtil.js

const successResponse = (res, data, pagination = null) => {
  res.json({
    status: 'success',
    data,
    pagination
  });
};

const errorResponse = (res, message, code = 'ERROR_CODE') => {
  res.status(500).json({
    status: 'error',
    message,
    code
  });
};

module.exports = { successResponse, errorResponse };
