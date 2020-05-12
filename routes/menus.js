const express = require('express');
const mongoose = require('mongoose');
const userDetails = require('../models/userDetails');
const router = express.Router();
const products = [{
    pid: 1,
    name: 'Products1',
    desc: 'prodtc details'
},
{
    pid: 2,
    name: 'Products2',
    desc: 'prodtc details'
}
];
router.post('/login', (req, res) => {
    userDetails.findOne({ userName: req.body.userName }, (err, user) => {
        if (!user) {
            res.json({ data: 'userName not present' });
            return;
        }

        if (user && user.password === req.body.password) {
            res.json({ data: true });
        } else {
            res.json({ data: false });
        }
    });
});

router.get('/:userName', (req, res) => {
    const pid = req.params.userName;
    const query = userDetails.find({
        'userName': pid
    }, (err, product) => {
        res.json(product);
    });
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