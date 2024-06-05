const express = require('express');
const router = express.Router();
const {getAllUsers , createUser , updateUser , deleteUser , getUser} = require('../Controller/userController');


router.get('/' , getAllUsers ); 
router.post('/' , createUser);
router.put('/:userId' , updateUser);
router.delete('/:userId' , deleteUser);
router.get('/:userId' , getUser);

module.exports = router;