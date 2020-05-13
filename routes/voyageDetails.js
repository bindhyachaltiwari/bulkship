const express = require('express');
const voyageDetails = require('../models/voyageDetails');
const router = express.Router();

router.post('/insertVoyageData', (req, res) => {
    const vesselDetailData = new voyageDetails(req.body.data.voyageDetails);
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
        if (vl.length) {
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
        if (v.length) {
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

router.get('/getAllVoyageDetails', (req, res) => {
    voyageDetails.find((err, cl) => {
        if (!cl) {
            res.json({ status: false, error: err });
            return;
        }
        if (cl.length) {
            res.json({
                status: true, voyageList: cl
            });
        } else {
            res.json({ status: false });
        }
    });
});

router.delete('/:pid', (req, res) => {
    voyageDetails.deleteOne({ '_id': req.params.pid }).then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: false
        });
    })
});

router.post('/updateVoyageDetails', (req, res) => {
    console.log(req.body.data);
    voyageDetails.findOneAndUpdate({ '_id': req.body.data._id }, req.body.data).then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: false
        });
    })
});


module.exports = router;