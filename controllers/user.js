const User = require("../models/user")
const { setUser } = require("../service/auth")
async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name, email, password
    })
    return res.render("home")
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    console.log("handleUserLogin ::", req.body);
    const user = await User.findOne({ email, password })
    console.log("handleUserLogin ::", user);
    if (!user) return res.render("login", { error: "Invalid User" })

    const token = setUser(user);
    console.log("handleUserLogin token ::", token);
    res.cookie("token", token)
    return res.redirect("/")
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}