const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype == Image / png || file.mimetype == Image / jpeg) {
        cb(null, true)
    }
    else {
        cb(new Error('I don\'t have a clue!'));
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = upload;