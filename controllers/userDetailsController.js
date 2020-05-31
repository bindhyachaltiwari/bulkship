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

exports.login = (req, res) => {
    userDetails.findOne({ userName: req.body.data.username }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not found' });
            return;
        }

        bcrypt.compare(req.body.data.password, user.password, (error, verified) => {
            if (error) {
                res.json({ status: false, err: 'Wrong Credentials' });
            }

            if (verified) {
                let respObj = {
                    status: true,
                    role: user.role,
                    displayName: user.displayName,
                    companyName: user.companyName,
                    userName: user.userName,
                    token: tokenGenerator,
                };

                if (user.role === 'Manager') {
                    respObj.managerRoles = user.managerRoles
                } else if (user.role === 'Client') {
                    respObj.clientDisplay = user.clientDisplay
                }

                res.json({ ...respObj });
            } else {
                res.json({ status: false, err: 'Wrong Credentials' });
            }
        });
    });
}

exports.checkUsername = (req, res) => {
    userDetails.findOne({ userName: req.body.data.userName }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not present' });
            return;
        }

        if (user) {
            res.json({ status: true });
            return;
        }
    });
}

exports.updatePassword = (req, res) => {
    userDetails.findOne({ userName: req.body.data.user }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not found' });
            return;
        }

        userDetails.update(
            { userName: req.body.data.user },
            { $set: { 'password': req.body.data.confirmPass } }
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
                        id: m['_id']
                    };
                })
            });
        } else {
            res.json({ status: false });
        }
    });
}