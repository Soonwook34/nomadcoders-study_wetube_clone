import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";

// dotenv 사용 포트 번호 지정
const PORT = process.env.PORT || 4000;

// respond 함수 (using Arrow Function)
const handleListening = () => console.log(`✅ Listening on: http://localhost:${PORT}`);

// server 시작
app.listen(PORT, handleListening);

