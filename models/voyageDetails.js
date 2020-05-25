const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var voyageDetails = new Schema({
    vId: {
        type: Number,
        unique: true,
        required: true
    },
    chartererName: {
        type: String,
        unique: false,
        required: true
    },
    vesselName: {
        type: String,
        unique: false,
        required: true
    },
    vesselSize: {
        type: String,
        unique: false,
    },
    cpDate: {
        type: String,
        unique: false,
        required: true
    },
    loadPort: {
        type: String,
        unique: false,
    },
    dischargePort: {
        type: String,
        unique: false,
    },
    cargo: {
        type: String,
        unique: false,
    },
    cargoIntake: {
        type: String,
        unique: false,
    },
    ownerName: {
        type: String,
        unique: false,
    },
    shipper: {
        type: String,
        unique: false,
    },
    loadPortAgent: {
        type: String,
        unique: false,
    },
    dischargePortAgent: {
        type: String,
        unique: false,
    },
    receiver: {
        type: String,
        unique: false,
    },
    onHireSurveyor: {
        type: String,
        unique: false,
    },
    offHireSurveyor: {
        type: String,
        unique: false,
    },
    bunkerSupplier: {
        type: String,
        unique: false,
    },
    bunkerTrader: {
        type: String,
        unique: false,
    },
    pniInsurance: {
        type: String,
        unique: false,
    },
    weatherRoutingCompany: {
        type: String,
        unique: false,
    },
    fieldVisibility: {
		type: Object,
		required: false
    },
    otherFields: {
        type: JSON,
    },
}, {
    collection: 'voyageDetails'
});
module.exports = mongoose.model('voyageDetails', voyageDetails);