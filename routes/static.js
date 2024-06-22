const express = require("express");
const router = express.Router()
const URL = require("../models/url")


router.get("/admin", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls
    });
})
router.get("/", async (req, res) => {
    console.log("getUser created url:", req.user);
    const allUrls = await URL.find({
        createdBy
            : req.user._id
    });
    return res.render("home", {
        urls: allUrls
    });
})
router.get("/signup", async (req, res) => {
    return res.render("signup");
})

router.get("/login", async (req, res) => {
    return res.render("login");
})


module.exports = router;