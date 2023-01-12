const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');

router.put('/user', middlewares.authenticateToken);
router.delete('/user', middlewares.authenticateToken);

module.exports = router;