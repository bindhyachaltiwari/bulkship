const express = require('express');
const contactUsController = require('../controllers/contactUsController');
const router = express.Router();

router.post('/', contactUsController.sendEmail);

module.exports = router;