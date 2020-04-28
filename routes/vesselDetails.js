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
        if (cl.length) {
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
        if (cl.length) {
            res.json({
                status: true, vesselList: cl
            });
        } else {
            res.json({ status: false });
        }
    });
});

router.delete('/:pid', (req, res) => {
    vesselDetails.deleteOne({ '_id': req.params.pid }).then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: false
        });
    })
});



router.post('/updateVessel', (req, res) => {
    console.log(req.body.data);
    vesselDetails.findOneAndUpdate({ '_id': req.body.data._id }, req.body.data).then(() => {
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