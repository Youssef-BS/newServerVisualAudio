const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');


router.post('/register' , authController.registerUser); 
router.post('/login' , authController.login);
router.post('/verifEmail' , authController.verifyEmail);
router.put('/acceptAccount/:id' , authController.AcceptAcountRequest);

module.exports = router;