const VoyageDocuments = require("../models/voyageDocuments");
const config = require("../config");
const mongoose = require("mongoose");

const url = config.mongoURI;
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "voyageDocuments",
  });
});

exports.uploadDocument = (req, res) => {
  let voyageDocument = new VoyageDocuments({
    voyageId: req.body.voyageId,
    description: req.body.description,
    fileName: req.file.filename,
    fileId: req.file.id,
  });

  voyageDocument.save().then(() => {
      res.json({
        status: true,
      });
    })
    .catch((e) => {
      res.json({
        status: e,
      });
    });
};

exports.getVoyageDocuments = (req, res) => {
  VoyageDocuments.find({ voyageId: req.params.voyageId }, (err, voyageDocs) => {
    if (!voyageDocs) {
      res.json({ status: false, error: err });
      return;
    }
    if (voyageDocs.length) {
      res.json({ status: true, voyageDocuments: voyageDocs });
    } else {
      res.json({ status: false });
    }
  });
};

exports.deleteVoyageDocument = (req, res) => {
  gfs.delete(new mongoose.Types.ObjectId(req.params.fileId), (err, data) => {
      if (err) {
          return res.json({ status: false });
      }

      VoyageDocuments.deleteOne({ fileId: req.params.fileId }).then(() => {
        res.json({
          status: true,
        });
      })
      .catch((e) => {
        res.json({
          status: false,
        });
      });
  });
  
};

exports.download = (req, res) => {
  gfs.find(new mongoose.Types.ObjectId(req.params.fileId)).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.json({
        status: false,
        message: "No files available",
      });
    }

    res.setHeader('Content-disposition', 'attachment; filename=' + files[0].filename);
    res.setHeader('Content-type', files[0].contentType);
    gfs.openDownloadStreamByName(files[0].filename).pipe(res);
  });
};
