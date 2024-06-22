const { getUser } = require("../service/auth")

async function checkUserIsLoginOrNot(req, res, next) {

    const tokenCookies = req.cookies.token;
    req.user = null;
    if (!tokenCookies) {
        return next();
    }
    const token = tokenCookies
    const user = getUser(token)
    req.user = user;
    return next();
}

function restrictTo(role = []) {
    return function (req, res, next) {
        console.log("restrictTo::", role, req.user.role, !role.includes(req.user.role));
        if (!req.user) return res.redirect("/login")
        if (!role.includes(req.user.role)) return res.end("unAuthorized")
        return next();
    }
}

module.exports = {
    checkUserIsLoginOrNot,
    restrictTo
}