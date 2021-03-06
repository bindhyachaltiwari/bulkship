
const voyageDetails = require('../models/voyageDetails');

exports.insertVoyageData = (req, res) => {
    const vesselDetailData = new voyageDetails(req.body.data.voyageDetails);
    vesselDetailData.vId = new Date().getTime();
    vesselDetailData.isActive = true;
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
}

exports.getAllVoyage = (req, res) => {
    voyageDetails.find({ $and: [{ chartererName: req.params.chartererName }, { isActive: true }] }, (err, vl) => {
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
}
exports.getVoyageDetails = (req, res) => {
    voyageDetails.find({ $and: [{ chartererName: req.params.userName }, { vesselName: req.params.vesselName }] }, (err, v) => {
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
                    dischargePort: v.dischargePort,
                    cargo: v.cargo,
                    cargoIntake: v.cargoIntake,
                    ownerName: v.ownerName
                }
            });
        } else {
            res.json({ status: false });
        }
    });
}

exports.getAllVoyageDetails = (req, res) => {
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
}

exports.activateVoyage = async (req, res) => {
    voyageDetails.findOne({ '_id': req.body.data.id }, async (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Voyage not found' });
            return;
        }
        voyageDetails.update(
            { '_id': req.body.data.id },
            { $set: { 'isActive': req.body.data.isActive } }
        ).then(e => {
            res.json({ status: true });
            return;
        });
    });
}

exports.deleteVoyageDetails = (req, res) => {
    voyageDetails.deleteOne({ '_id': req.params.pid }).then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: false
        });
    })
}
exports.updateVoyageDetails = (req, res) => {
    voyageDetails.findOneAndUpdate({ '_id': req.body.data._id }, req.body.data).then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: false
        });
    })
}
exports.getPortDetails = (req, res) => {
    voyageDetails.find({ $and: [{ chartererName: req.params.userName }, { vesselName: req.params.vesselName }, { cpDate: req.params.cpDate }] }, (err, v) => {
        if (!v.length || err) {
            res.json({ status: false, error: 'No details found' });
            return;
        }
        if (v.length) {
            v = v[0];
            res.json({
                status: true,
                portDetails: {
                    loadPort: v.loadPort,
                    dischargePort: v.dischargePort,
                }
            });
        }
    }).catch(e => {
        res.json({ status: false });
    })

}