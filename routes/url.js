const express = require("express");
const { handleGenerateShortURL, handleFindAndUpdateData } = require("../controllers/url")
const router = express.Router();

router.post("/", handleGenerateShortURL)

router.get("/:shortID", handleFindAndUpdateData)

module.exports = router