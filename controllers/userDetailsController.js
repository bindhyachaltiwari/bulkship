const userDetails = require('../models/userDetails');
const tokenGenerator = 'CiI1qd4zu0Hn3ZQGJNtAFglzmYeRaGeO';
const bcrypt = require("bcrypt");
exports.insertUserDetails = (req, res) => {
    const userDetailsData = new userDetails(req.body.data);
    userDetailsData.save().then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: e
        });
    });
}

exports.checkUsername = (req, res) => {
    userDetails.findOne({ userName: req.body.data }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not present' });
            return;
        }

        if (user) {
            res.json({ status: true , password: user.password});
            return;
        }
    });
}

exports.updatePassword = (req, res) => {
    userDetails.findOne({ userName: req.body.data.user }, async (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not found' });
            return;
        }

        const p = await bcrypt.hash(req.body.data.confirmPass, 12)
        userDetails.update(
            { userName: req.body.data.user },
            { $set: { 'password': p } }
        ).then(e => {
            res.json({ status: true });
            return;
        });
    });
}

exports.getUsername = (req, res) => {
    const pid = req.params.userName;
    const query = userDetails.find({
        'userName': pid
    }, (err, product) => {
        res.json(product);
    })
}

exports.getAllClientList = (req, res) => {
    userDetails.find({ role: 'Client' }, (err, cl) => {
        if (!cl) {
            res.json({ status: false, error: err });
            return;
        }
        if (cl.length) {
            res.json({ status: true, clientList: cl.map(m => m.companyName) });
        } else {
            res.json({ status: false });
        }
    });
}

exports.getAllUserDetails = (req, res) => {
    userDetails.find((err, cl) => {
        if (!cl) {
            res.json({ status: false, error: err });
            return;
        }
        if (cl.length) {
            res.json({
                status: true,
                clientList: cl.map(m => {
                    return {
                        userName: m.userName,
                        displayName: m.displayName,
                        companyName: m.companyName,
                        role: m.role,
                        clientType: m.clientType,
                        managerRoles: m.managerRoles,
                        clientDisplay: m.clientDisplay,
                        id: m['_id']
                    };
                })
            });
        } else {
            res.json({ status: false });
        }
    });
}

exports.deletePid = (req, res) => {
    userDetails.deleteOne({ '_id': req.params.pid }).then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: false
        });
    })
}

exports.updateUserDetails = async (req, res) => {
    if (req.body.data.password) {
        req.body.data.password = await bcrypt.hash(req.body.data.password, 12)
    }
    userDetails.findOneAndUpdate({ '_id': req.body.data.id }, req.body.data).then(() => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: false
        });
    })
}