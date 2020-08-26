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

  console.log(JSON.stringify(voyageDocument));

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
  VoyageDocuments.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({
        status: true,
      });
    })
    .catch((e) => {
      res.json({
        status: false,
      });
    });
};
