const express = require("express");
const router = express()
const { postData, putData, deleteData } = require("./controller")

router.post("/register", postData)
router.put("/:id", putData)
router.delete("/:id", deleteData)

module.exports = router
