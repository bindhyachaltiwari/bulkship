const express = require('express');
const PerformanceDetails = require('../models/performanceDetails');
const router = express.Router();

router.post('/insertPerformanceData', (req, res) => {
    const performanceDetailsData = new PerformanceDetails(req.body.data);
    if (!performanceDetailsData.isDetailsFilled) {
        performanceDetailsData.vId = new Date().getTime();
        performanceDetailsData.cpDate = performanceDetailsData.cpDate.split('T')[0];
    }
    performanceDetailsData.save().then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: e
        });
    });
});


router.post('/getPerformanceDetails', (req, res) => {
    vesselDetails.find({ $and: [{ chartererName: req.body.data.userName }, { vesselName: req.body.data.vessel }, { cpDate: req.body.data.cpDate }] }, (err, v) => {
        if (!v.length || err) {
            res.json({ status: false, error: 'No details found' });
            return;
        }
        if (v.length) {
            v = v[0];
            res.json({
                status: true,
                performanceDetails: {
                    vesselName: v.vesselName,
                    vesselSize: v.vesselSize,
                    cpDate: v.cpDate,
                    loadPort: v.loadPort,
                    dischargePoint: v.dischargePoint,
                    cargo: v.cargo,
                    cargoIntake: v.cargoIntake,
                    onwerName: v.onwerName
                }
            });
        } else {
            res.json({ status: false });
        }
    });
});

router.post('/getAllVessels', (req, res) => {
    PerformanceDetails.find({ isDetailsFilled: req.body.data.isDetailsFilled }, (err, vl) => {
        if (!vl) {
            res.json({ status: false, error: err });
            return;
        }
        if (vl.length) {
            res.json({ status: true, vesselList: vl });
        } else {
            res.json({ status: false });
        }
    });
});


router.post('/fillPerformanceDetails', (req, res) => {
    PerformanceDetails.findOne({ _id: req.body.data.vId }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: "Username not found" });
            return;
        }
        let data = req.body.data;
        PerformanceDetails.update(
            { _id: req.body.data.vId },
            {
                $set: {
                    "isDetailsFilled": true,
                    NumberOfDaysOrg: data.NumberOfDaysOrg,
                    NumberOfDaysAct: data.NumberOfDaysAct,
                    BunkerConsumptionIFOOrg: data.BunkerConsumptionIFOOrg,
                    BunkerConsumptionIFOAct: data.BunkerConsumptionIFOAct,
                    BunkerConsumptionMDOOrg: data.BunkerConsumptionMDOOrg,
                    BunkerConsumptionMDOAct: data.BunkerConsumptionMDOAct,
                    BunkerPriceIFOOrg: data.BunkerPriceIFOOrg,
                    BunkerPriceIFOAct: data.BunkerPriceIFOAct,
                    BunkerPriceMDOOrg: data.BunkerPriceMDOOrg,
                    BunkerPriceMDOAct: data.BunkerPriceMDOAct,
                    LoadPortDAOrg: data.LoadPortDAOrg,
                    LoadPortDAAct: data.LoadPortDAAct,
                    DischargePortDAOrg: data.DischargePortDAOrg,
                    DischargePortDAAct: data.DischargePortDAAct,
                    ILOHCandCVEOrg: data.ILOHCandCVEOrg,
                    ILOHCandCVEAct: data.ILOHCandCVEAct,
                    BunkerSurveyCostBendsOrg: data.BunkerSurveyCostBendsOrg,
                    BunkerSurveyCostBendsAct: data.BunkerSurveyCostBendsAct,
                    WXRoutingExpenseOrg: data.WXRoutingExpenseOrg,
                    WXRoutingExpenseAct: data.WXRoutingExpenseAct,
                    PNIInsuranceOrg: data.PNIInsuranceOrg,
                    PNIInsuranceAct: data.PNIInsuranceAct,
                    DespatchPaidOrg: data.DespatchPaidOrg,
                    DespatchPaidAct: data.DespatchPaidAct,
                    OtherExpenseOrg: data.OtherExpenseOrg,
                    OtherExpenseAct: data.OtherExpenseAct,
                    HRA_WARRiskOrg: data.HRA_WARRiskOrg,
                    HRA_WARRiskAct: data.HRA_WARRiskAct,
                    DemmurrageReceivedOrg: data.DemmurrageReceivedOrg,
                    DemmurrageReceivedAct: data.DemmurrageReceivedAct,
                    CargoQuantityOrg: data.CargoQuantityOrg,
                    CargoQuantityAct: data.CargoQuantityAct,
                }
            }
        ).then(e => {
            res.json({ status: true });
            return;
        });
    });
});

module.exports = router;