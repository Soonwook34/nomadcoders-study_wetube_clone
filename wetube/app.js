import express from "express";
// const express = require('express'); => babel 사용으로 대체
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes"

const app = express();

//middleware 함수
const betweenHome = (req, res, next) => {
    console.log("I'm between");
    next();
}

// View Engine을 Pug로 설정
app.set("view engine", "pug");

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


// routing 설정
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// export
export default app;
