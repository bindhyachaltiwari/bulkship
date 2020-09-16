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
        type: String,
        required: true,
        trim: true
    },
    built: {
        type: String,
        trim: true
    },
    LOA: {
        type: String,
        trim: true
    },
    beam: {
        type: String,
        trim: true
    },
    cranes: {
        type: String,
        trim: true
    },
    grabs: {
        type: String,
        trim: true
    },
    otherFields: {
        type: JSON,
    },
    flag: {
        type: String,
        trim: true
    },
    draft: {
        type: String,
        trim: true
    },
    GRT: {
        type: String,
        trim: true
    },
    NRT: {
        type: String,
        trim: true
    },
    TPC: {
        type: String,
        trim: true
    },
    grainCapacity: {
        type: String,
        trim: true
    },
    baleCapacity: {
        type: String,
        trim: true
    },
    holdsHatches: {
        type: String,
        trim: true
    },
    vesselType: {
        type: String,
        trim: true
    },
    otherFields :{
        type: JSON,   
    }
}, {
    collection: 'vesselDetails'
});
module.exports = mongoose.model('vesselDetails', vesselDetails);