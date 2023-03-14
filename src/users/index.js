const express = require("express");
const router = express()
const { getData, getDataID } = require("./controller")

router.get("/", getData)
router.get("/:id", getDataID)

module.exports = router
