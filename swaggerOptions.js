// swaggerOptions.js
const swaggerJsDoc = require('swagger-jsdoc');

// 환경변수에서 PORT와 HOST 값을 가져오기
const PORT = process.env.PORT || 13221;
const HOST = process.env.HOST || '113.198.66.75';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Application API',
      version: '1.0.0',
      description: 'API documentation for job application management system',
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`, // 외부 접속용 URL
        description: "Public server",
      },
      {
        url: `http://localhost:${PORT}`, // 로컬 테스트용 URL
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'https',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // API 경로 설정
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
