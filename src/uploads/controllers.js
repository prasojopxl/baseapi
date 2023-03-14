const multer = require('multer');
const upload = multer({ dest: __dirname + '/uploads/images' });

// post Data

const postData = async (req, res, next) => {
    const { body } = req
    if (req.file) {
        // res.json({
        //     filename: req.file.filename,
        //     size: req.file.size
        //     mimetype: req.file.mimetype
        // });
        res.json(req.file);
    }
    else throw 'error';
}


const getImage = async (req, res, next) => {
    const uploadFolder = __dirname + '/images';
    const file = `${uploadFolder}/${req.params.fileName}`;
    res.sendFile(file)
}

module.exports = { postData, getImage }
