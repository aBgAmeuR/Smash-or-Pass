const express = require('express');
const router = express.Router();
const SmashListController = require('../Controllers/SmashList');
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

router.post('/smashlist', upload.single('img'), SmashListController.CreateSmashList);
router.post('/smashlist/add', upload.single('img'), SmashListController.CreateSmashList);

module.exports = router;