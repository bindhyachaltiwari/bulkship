const express = require('express');
const voyageDetails = require('../models/voyageDetails');
const router = express.Router();

router.post('/insertVoyageData', (req, res) => {
    const vesselDetailData = new voyageDetails(req.body.data);
    vesselDetailData.vId = new Date().getTime();
    vesselDetailData.cpDate = vesselDetailData.cpDate.split('T')[0];
    vesselDetailData.save().then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: e
        });
    });
});

router.post('/getAllVoyage', (req, res) => {
    voyageDetails.find({ chartererName: req.body.data.companyName }, (err, vl) => {
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

router.post('/getVoyageDetails', (req, res) => {
    voyageDetails.find({ $and: [{ chartererName: req.body.data.userName }, { vesselName: req.body.data.vessel }] }, (err, v) => {
        if (!v.length || err) {
            res.json({ status: false, error: 'No details found' });
            return;
        }
        if (v) {
            v = v[0];
            res.json({
                status: true,
                voyageDetails: {
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







module.exports = router;