import app from "./app";

// 포트 번호 지정
const PORT = 4000;

// respond 함수 (using Arrow Function)
const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

// server 시작
app.listen(PORT, handleListening);

