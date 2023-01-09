const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/User');
const userController = new UserController();

router.post('/user/create');
router.get('/user', userController.GetUser);

module.exports = router;