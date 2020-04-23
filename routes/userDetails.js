const express = require('express');
const userDetails = require('../models/userDetails');
const router = express.Router();
const tokenGenerator = 'CiI1qd4zu0Hn3ZQGJNtAFglzmYeRaGeO';
router.post('/insertUserDetails', (req, res) => {
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
});

router.post('/login', (req, res) => {
    userDetails.findOne({ userName: req.body.data.username }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: "Username not found" });
            return;
        }

        if (user && user.password === req.body.data.password) {
            res.json({
                status: true,
                role: user.role,
                displayName: user.displayName,
                companyName: user.companyName,
                userName: user.userName,
                token: tokenGenerator,
                managerRoles: user.managerRoles
            });
        } else {
            res.json({ status: false, err: "Wrong Credentials" });
        }
    });
});

router.post('/checkUsername', (req, res) => {
    userDetails.findOne({ userName: req.body.data.userName }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: "Username not present" });
            return;
        }

        if (user) {
            res.json({ status: true });
            return;
        }
    });
});

router.post('/updatePassword', (req, res) => {
    userDetails.findOne({ userName: req.body.data.user }, (err, user) => {
        if (!user) {
            res.json({ status: false, err: "Username not found" });
            return;
        }

        userDetails.update(
            { userName: req.body.data.user },
            { $set: { "password": req.body.data.confirmPass } }
        ).then(e => {
            res.json({ status: true });
            return;
        });
    });
});

router.get('/:userName', (req, res) => {
    const pid = req.params.userName;
    const query = userDetails.find({
        'userName': pid
    }, (err, product) => {
        res.json(product);
    })
});

router.post('/getAllClients', (req, res) => {
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
});

router.post('/getAllClientDetails', (req, res) => {
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
                        managerRoles:m.managerRoles,
                        id:m['_id']
                    };
                })
            });
        } else {
            res.json({ status: false });
        }
    });
});
router.post('/getAllManager', (req, res) => {
    userDetails.find({ role: 'Manager' }, (err, cl) => {
        if (!cl) {
            res.json({ status: false, error: err });
            return;
        }
        if (cl.length) {
            res.json({ status: true, managerList: cl.map(m => m.userName) });
        } else {
            res.json({ status: false });
        }
    });
});

router.post('/addRightsValue',(req, res) => {
    
    for( var i=0; i<req.body.data.adminList.length;i++) {
        userDetails.update(
            { userName: req.body.data.adminList[i]},
            { $set: { 'isAdmin': true } },
            {multi:true}
        ).then(e => {
            res.json({ status: true });
        });
    }
    
});

// router.delete('/:pid',(req,res) => {
//     Products.findOneAndRemove(
//         {
//             'pid':req.params.pid
//         },
//         function(err,product){
//             console.log('error')
//         }
//     )
// })
module.exports = router;