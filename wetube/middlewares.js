import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "videos/" });

// Global 변수 추가
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videoFile");