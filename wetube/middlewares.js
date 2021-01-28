import routes from "./routes";

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