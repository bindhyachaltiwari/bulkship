const express = require('express');
const voyageDetailsController = require('../controllers/voyageDetailsController');
const router = express.Router();

router.post('/insertVoyageData', voyageDetailsController.insertVoyageData);

router.get('/getAllVoyage/:chartererName', voyageDetailsController.getAllVoyage);

router.get('/getVoyageDetails/:userName/:vesselName', voyageDetailsController.getVoyageDetails);

router.get('/getAllVoyageDetails', voyageDetailsController.getAllVoyageDetails);

router.delete('/:pid', voyageDetailsController.deleteVoyageDetails);

router.post('/updateVoyageDetails', voyageDetailsController.updateVoyageDetails);

router.get('/getPortDetails/:userName/:vesselName/:cpDate', voyageDetailsController.getPortDetails);

router.post('/activateVoyage', voyageDetailsController.activateVoyage);

module.exports = router;