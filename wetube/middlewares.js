import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

// Global 변수 추가
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes
    res.locals.user = req.user || null;
    console.log(req.user);
    next();
};

export const uploadVideo = multerVideo.single("videoFile");