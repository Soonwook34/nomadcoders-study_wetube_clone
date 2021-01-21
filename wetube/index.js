const express = require('express');
const app = express();

// 포트 번호 지정
const PORT = 4000;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

// 서버 시작
app.listen(PORT, handleListening);
