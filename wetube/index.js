const express = require('express');
const app = express();

// 포트 번호 지정
const PORT = 4000;

// respond 함수
function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
    console.log(req);
    res.send("Hello from Home");
}

function handleProfile(req, res) {
    res.send("You are on my profile");
}

// route 생성
app.get("/", handleHome);

app.get("/profile", handleProfile);

// server 시작
app.listen(PORT, handleListening);
