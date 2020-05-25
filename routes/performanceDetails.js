const express = require('express');
const performanceDetailsController = require('../controllers/performanceDetailsController');
const router = express.Router();

router.post('/insertPerformanceData', performanceDetailsController.addPerformanceData);

router.get('/getCompletePerformanceDetailsForView/:userName/:vesselName/:cpDate', performanceDetailsController.getCompletePerformanceDetailsForView);

router.get('/getAllVessels/:isDetailsFilled', performanceDetailsController.getAllVessels);

router.post('/fillPerformanceDetails', performanceDetailsController.fillPerformanceDetails);

router.get('/getPerformanceDetails/:chartererName/:vesselName/:cpDate',performanceDetailsController.getPerformanceDetails);

module.exports = router;