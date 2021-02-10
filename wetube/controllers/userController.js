import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};
  
export const postJoin = async (req, res, next) => {
    // req.body => bodyParser using ECMAScript6(ES6)
    const { body: { name, email, password, password2 } } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        // Register User
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            // 회원가입에 성공하면 postLogin으로 가서 자동 로그인
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};
  
export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });
// username(email)과 password로 인증
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
  });

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};


export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });