const express = require('express');
const userDetailsController = require('../controllers/userDetailsController');
const router = express.Router();

router.post('/insertUserDetails', userDetailsController.insertUserDetails);

router.post('/login', userDetailsController.login);

router.post('/checkUsername', userDetailsController.checkUsername);

router.post('/updatePassword', userDetailsController.updatePassword);

router.get('getUsername/:userName', userDetailsController.getUsername);

router.get('/getAllClientList', userDetailsController.getAllClientList);

router.get('/getAllUserDetails', userDetailsController.getAllUserDetails);

router.get('/getAllManager', userDetailsController.getAllManager);

router.post('/addRightsValue', userDetailsController.addRightsValue);

module.exports = router;