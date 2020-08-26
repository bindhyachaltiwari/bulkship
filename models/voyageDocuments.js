const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var voyageDocuments = new Schema(
  {
    voyageId: {
      type: String,
      unique: false,
      required: true,
    },
    description: {
      required: true,
      type: String,
    },
    fileName: {
      required: true,
      type: String,
    },
    fileId: {
      required: true,
      type: String,
    },
    createdAt: {
      default: Date.now(),
      type: Date,
    },
  },
  {
    collection: "voyageDocuments",
  }
);
module.exports = mongoose.model("voyageDocuments", voyageDocuments);
