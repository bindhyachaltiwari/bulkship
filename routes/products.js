const express = require('express');
const mongoose = require('mongoose');
const Products = require('../models/products');
const router = express.Router();
router.post('/', (req, res, next) => {
    const product = new Products(req.body);
    product.save().then(product => {
        res.json({
            status: true
        })
    }).catch(e => {
        res.json({
            status: true
        });
    });
});

router.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    const query = Products.find({
        'pid': pid
    }, (err, product) => {
        res.json(product);
    })
});

router.delete('/:pid', (req, res) => {
    Products.findOneAndRemove({
        'pid': req.params.pid
    }, (err, product) => {
        console.log('error')
    });
});

module.exports = router;