const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const { route } = require('./SmashList');

router.put('/user', middlewares.authenticateToken);
router.delete('/user', middlewares.authenticateToken);
router.post('/smashlist', middlewares.authenticateToken);
router.post('/smashlist/item', middlewares.authenticateToken);

module.exports = router;