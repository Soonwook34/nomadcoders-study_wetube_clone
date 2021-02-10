import express from "express";
// const express = require('express'); => babel 사용으로 대체
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes"
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);
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

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({ mongooseConnection: mongoose.connection })
    })
);
// cookieParser로부터 쿠기를 받고 passport를 initialize한 다음 localMiddleware에서 사용자를 req.user로 만들어줌
app.use(passport.initialize());
app.use(passport.session());
// middleware 
app.use(localsMiddleware);

// routing 설정
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

// export
export default app;
