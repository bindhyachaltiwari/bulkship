const userDetails = require('../models/userDetails');
const emailUtil = require("../utils/email");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('CiI1qd4zu0Hn3ZQGJNtAFglzmYeRaGeO');
exports.insertUserDetails = (req, res) => {
    const userDetailsData = new userDetails(req.body.data);
    userDetailsData.isActive = true;
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
    userDetails.findOne({ userName: req.body.data }, async (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not present' });
            return;
        }

        if (user) {
            const pass = await cryptr.decrypt(user.password)
            const content = `Name: ${user.displayName} \n\nE-mail: ${req.body.data} \nPassword: ${pass} `;
            let emailObj = {
                email: req.body.data,
                subject: 'Bulkcom Shipping Login Details',
                content,
            };

            emailUtil.sendEmail(emailObj, res);
            res.json({ status: true });
            return;
        }
    });
}

exports.updatePassword = async (req, res) => {
    userDetails.findOne({ userName: req.body.data.user }, async (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not found' });
            return;
        }
        const p = await cryptr.encrypt(req.body.data.confirmPass)
        userDetails.update(
            { userName: req.body.data.user },
            { $set: { 'password': p } }
        ).then(e => {
            res.json({ status: true });
            return;
        });
    });
}

exports.activateUser = async (req, res) => {
    userDetails.findOne({ userName: req.body.data.userName }, async (err, user) => {
        if (!user) {
            res.json({ status: false, err: 'Username not found' });
            return;
        }
        userDetails.update(
            { userName: req.body.data.userName },
            { $set: { 'isActive': req.body.data.isActive } }
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
                        isActive: m.isActive,
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
        req.body.data.password = await cryptr.encrypt(req.body.data.password);
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