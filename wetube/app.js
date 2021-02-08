import express from "express";
// const express = require('express'); => babel 사용으로 대체
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes"
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

// helmet middleware 사용 for security
app.use(helmet({ contentSecurityPolicy: false }));

// View Engine을 Pug로 설정
app.set("view engine", "pug");

// video 파일을 전송해주기 위한 middleware express.static()
app.use("/uploads", express.static("uploads"));
// 경로 연결
app.use("/static", express.static("static"));
// middleware bodyParser, cookieParser(json, urlencoded) 사용
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// morgan middleware 사용 for logging (combined / common / dev / short / tiny)
app.use(morgan("dev"));
// middleware 
app.use(localsMiddleware);

// routing 설정
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// export
export default app;
