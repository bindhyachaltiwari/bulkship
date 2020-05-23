const express = require('express');
const performanceDetailsController = require('../controllers/performanceDetailsController');
const router = express.Router();

router.post('/insertPerformanceData', performanceDetailsController.addPerformanceData);

// router.post('/getPerformanceDetails:/userName/:vesselName/:cpDate', performanceDetailsController.getAllPerformanceDetails);

router.get('/getAllVessels', performanceDetailsController.getAllVessels);

router.post('/fillPerformanceDetails', performanceDetailsController.fillPerformanceDetails);

module.exports = router;