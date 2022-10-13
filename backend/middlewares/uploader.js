const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public');
        },
        filename(req, file, cb) {
            cb(null, `${new Date().getTime()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png|bmp)$/)) {
            return cb(
                new Error('only upload files with jpg, jpeg, png, bmp format.')
            );
        }
        cb(undefined, true);
    }
});

module.exports = { upload };