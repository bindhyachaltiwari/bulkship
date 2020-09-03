const express = require('express');
const careerController = require('../controllers/careerController');
const router = express.Router();

router.post('/', careerController.uploadResume);

module.exports = router;