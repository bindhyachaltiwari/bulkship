const express = require('express');
const userDetailsController = require('../controllers/userDetailsController');
const loginController = require('../controllers/loginController')
const router = express.Router();

router.post('/insertUserDetails', userDetailsController.insertUserDetails);

router.post('/login', loginController.login);

router.post('/checkUsername', userDetailsController.checkUsername);

router.post('/updatePassword', userDetailsController.updatePassword);

router.get('getUsername/:userName', userDetailsController.getUsername);

router.get('/getAllClientList', userDetailsController.getAllClientList);

router.get('/getAllUserDetails', userDetailsController.getAllUserDetails);

router.delete('/:pid', userDetailsController.deletePid);

router.post('/updateUserDetails', userDetailsController.updateUserDetails);

router.post('/activateUser', userDetailsController.activateUser);

module.exports = router;