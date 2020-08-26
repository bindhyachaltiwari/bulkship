const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const config = require('../config');

const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'voyageDocuments'
                };
                resolve(fileInfo);
            });
        });
    }
  });

var uploadFile = multer({ storage: storage }).single("file");
module.exports = uploadFile;