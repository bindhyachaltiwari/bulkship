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
    }, NumberOfDaysOrg: {
        type: String,
    }, NumberOfDaysAct: {
        type: String,
    }, BunkerConsumptionIFOOrg: {
        type: String,
    }, BunkerConsumptionIFOAct: {
        type: String,
    }, BunkerConsumptionMDOOrg: {
        type: String,
    }, BunkerConsumptionMDOAct: {
        type: String,
    }, BunkerPriceIFOOrg: {
        type: String,
    }, BunkerPriceIFOAct: {
        type: String,
    }, DWTBunkerPriceMDOOrg: {
        type: String,
    }, BunkerPriceMDOAct: {
        type: String,
    }, LoadPortDAOrg: {
        type: String,
    }, LoadPortDAAct: {
        type: String,
    }, DischargePortDAOrg: {
        type: String,
    }, DischargePortDAAct: {
        type: String,
    }, ILOHCandCVEOrg: {
        type: String,
    }, ILOHCandCVEAct: {
        type: String,
    }, BunkerSurveyCostBendsOrg: {
        type: String,
    }, BunkerSurveyCostBendsAct: {
        type: String,
    }, WXRoutingExpenseOrg: {
        type: String,
    }, WXRoutingExpenseAct: {
        type: String,
    }, PNIInsuranceOrg: {
        type: String,
    }, PNIInsuranceAct: {
        type: String,
    }, DespatchPaidOrg: {
        type: String,
    }, DespatchPaidAct: {
        type: String,
    }, OtherExpenseOrg: {
        type: String,
    }, OtherExpenseAct: {
        type: String,
    }, HRA_WARRiskOrg: {
        type: String,
    }, HRA_WARRiskAct: {
        type: String,
    }, DemmurrageReceivedOrg: {
        type: String,
    }, DemmurrageReceivedAct: {
        type: String,
    }, CargoQuantityOrg: {
        type: String,
    }, CargoQuantityAct: {
        type: String,
    },
}, {
    collection: 'performanceDetails'
});
module.exports = mongoose.model('performanceDetails', performanceDetails);