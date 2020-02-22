const express = require('express');
const vesselDetails = require('../models/vesselDetails');
const router = express.Router();

router.post('/insertVesselDetails', (req, res) => {
    const vesseldata = new vesselDetails(req.body.data);
    vesseldata.save().then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: e
        });
    });
});

router.post('/getAllVessels', (req, res) => {
    vesselDetails.find((err, cl) => {
        if (!cl) {
            res.json({ status: false, error: err });
            return;
        }
        if (cl) {
            res.json({
                status: true, vesselList: cl.map(m => {
                    return { vesselName: m.vesselName, DWT: m.DWT };
                })
            });
        } else {
            res.json({ status: false });
        }
    });
});

router.post('/getAllVesselDetails', (req, res) => {
    vesselDetails.find((err, cl) => {
        if (!cl) {
            res.json({ status: false, error: err });
            return;
        }
        if (cl) {
            res.json({
                status: true, vesselList: cl
            });
        } else {
            res.json({ status: false });
        }
    });
});

module.exports = router;