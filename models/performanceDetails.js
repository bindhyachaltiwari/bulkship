const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var performanceDetails = new Schema({
    vId: {
        type: Number,
        unique: true,
        required: true
    }, isDetailsFilled: {
        type: Boolean,
        unique: false,
        required: true
    }, chartererName: {
        type: String,
        unique: false,
        required: true
    }, vesselName: {
        type: String,
        unique: false,
        required: true
    }, cpDate: {
        type: String,
        unique: false,
        required: true
    }, loadPort: {
        type: String,
    }, dischargePort: {
        type: String,
    }, tcHire: {
        type: Number
    }, addressCommission: {
        type: Number
    }, CargoQuantityAct: {
        type: Number
    }, CargoQuantityOrg: {
        type: Number
    }, ILOHCandCVEAct$: {
        type: Number
    }, ILOHCandCVEOrg$: {
        type: Number
    }, PNIInsuranceAct$: {
        type: Number
    }, PNIInsuranceOrg$: {
        type: Number
    }, addressCommission: {
        type: Number
    }, bunkerIFOAct: {
        type: Object
    }, bunkerIFOOrg: {
        type: Object
    }, bunkerMDOAct: {
        type: Object
    }, bunkerMDOOrg: {
        type: Object
    }, dischargePortDelay: {
        type: Object
    }, bunkerSurveyCostBendsAct$: {
        type: Number
    }, despatchPaidAct$: {
        type: Number
    }, despatchPaidOrg$: {
        type: Number
    }, bunkerSurveyCostBendsOrg$: {
        type: Number
    }, dischargePortDAAct$: {
        type: Number
    }, dischargePortDAOrg$: {
        type: Number
    }, freightAct: {
        type: Number
    }, freightOrg: {
        type: Number
    }, intermediatePortDelay: {
        type: Object
    }, loadPortDelay: {
        type: Object
    }, voyageDays: {
        type: Object
    }, loadPortDAAct$: {
        type: Number
    }, loadPortDAOrg$: {
        type: Number
    }, otherExpenseOrg$: {
        type: Number
    }, otherExpenseAct$: {
        type: Number
    }, wXRoutingExpenseAct$: {
        type: Number
    }, wXRoutingExpenseOrg$: {
        type: Number
    }, tcHire: {
        type: Number
    }, remarks :{
        type: String
    }


}, {
    collection: 'performanceDetails'
});
module.exports = mongoose.model('performanceDetails', performanceDetails);
