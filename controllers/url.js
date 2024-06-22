const shortid = require('shortid');
const URL = require("../models/url")


async function handleGenerateShortURL(req, res) {
    const shortId = shortid();
    console.log("handleGenerateShortURL::", req.body);

    if (!req.body.url) res.status(400).json("Url is required")
    await URL.create({
        shortId: shortId,
        redirectURL: req.body.url,
        visitHistory: [],
        createdBy: req.user._id
    })

    return res.render("home", {
        id: shortId
    })
}

async function handleFindAndUpdateData(req, res) {
    const shortId = req.params.shortID;
    console.log("shortID ::::::", shortId);
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamps: Date.now()
            }
        }
    })
    console.log("shortID entry::::::", entry);
    res.redirect(entry?.redirectURL)
}


module.exports = {
    handleGenerateShortURL,
    handleFindAndUpdateData
}