const express = require('express');
const router = express.Router();
const InputVerifController = require('../Controllers/InputVerif');
const inputVerifController = new InputVerifController();

router.use(inputVerifController.InputVerif);

module.exports = router;