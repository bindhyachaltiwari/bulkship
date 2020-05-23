const express = require('express');
const vesselDetailsController = require('../controllers/vesselDetailsController');
const router = express.Router();

router.post('/insertVesselDetails', vesselDetailsController.insertVesselDetails);

router.get('/getAllVesselsList', vesselDetailsController.getAllVesselsList);

router.get('/getAllVesselDetails', vesselDetailsController.getAllVesselDetails);

router.delete('/:pid', vesselDetailsController.deletePid);

router.post('/updateVesselDetails', vesselDetailsController.updateVessel);

module.exports = router;