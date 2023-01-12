const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User');

router.post('/user/create', UserController.CreateUser);
router.get('/user/login', UserController.Login);

module.exports = router;