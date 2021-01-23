import express from "express";
// const express = require('express'); => babel 사용으로 대체
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {userRouter} from "./router";

const app = express();

// respond 함수 (using Arrow Function)
const handleHome = (req, res) => res.send("Hello from Home");

const handleProfile = (req, res) => res.send("You are on my profile");

//middleware 함수
const betweenHome = (req, res, next) => {
    console.log("I'm between");
    next();
}

// middleware global 사용
app.use(betweenHome);
// middleware bodyParser, cookieParser(json, urlencoded) 사용
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// helmet middleware 사용 for security
app.use(helmet());
// morgan middleware 사용 for logging (combined / common / dev / short / tiny)
app.use(morgan("dev"));

// route 생성
app.get("/", handleHome);
app.get("/profile", handleProfile);

// routing 설정
app.use("/user", userRouter);

// export
export default app;
