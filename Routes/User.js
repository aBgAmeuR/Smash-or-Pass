const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User');

router.post('/user', UserController.CreateUser);
router.get('/user', UserController.Login);
router.put('/user', UserController.UpdateUser);
router.delete('/user', UserController.DeleteUser);

module.exports = router;