const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var vesselDetails = new Schema({
    vesselName: {
        type: String,
        required: true,
        trim: true
    },
    IMO: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    DWT: {
        type: Number,
        required: true,
        trim: true
    },
    built: {
        type: Number,
        trim: true
    },
    LOA: {
        type: Number,
        trim: true
    },
    beam: {
        type: Number,
        trim: true
    },
    cranes: {
        type: String,
        trim: true
    },
    grabs: {
        type: String,
        trim: true
    }
}, {
    collection: 'vesselDetails'
});
module.exports = mongoose.model('vesselDetails', vesselDetails);