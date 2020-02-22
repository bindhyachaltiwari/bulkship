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
        if (v) {
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
        if (vl) {
            res.json({ status: true, vesselList: vl });
        } else {
            res.json({ status: false });
        }
    });
});

module.exports = router;