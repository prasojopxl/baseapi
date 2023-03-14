const express = require("express");
const router = express()
const { postData, getImage } = require("./controllers")
const multer = require('multer');

const path = require("path")
const uploadFolder = __dirname + '/images';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });


router.post("/", upload.single('photo'), postData)
router.get("/image/:fileName", getImage)

module.exports = router
