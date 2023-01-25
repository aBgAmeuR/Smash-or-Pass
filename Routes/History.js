const express = require('express');
const router = express.Router();
const HistoryController = require('../Controllers/History');

router.post('/user/history', HistoryController.CreateHistory);
router.get('/user/history', HistoryController.GetHistory);
router.patch('/user/history', HistoryController.UpdateHistory);

module.exports = router;