// app.js

const express = require('express');
const controller = require('./src/controller');

const app = express();
app.use(express.json()); // JSON 요청 본문을 처리하기 위한 설정

// 모든 POST 요청을 controller가 처리하도록 전달
app.post('/mcp', controller.handleRequest);

// 3000번 포트에서 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ MCP Server is running on port ${PORT}`);
});