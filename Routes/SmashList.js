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
router.get('/smashlist', SmashListController.GetSmashList);
router.post('/smashlist/item', upload.single('img'), SmashListController.AddItemSmashList);
router.get('/smashlist/item', SmashListController.GetSmashListItems);
router.get('/smashlist/length', SmashListController.GetSmashListLength);
router.get('/smashlist/user', SmashListController.GetSmashListFromUser);
router.get('/smashlist/category', SmashListController.GetSmashListFromCategory);



module.exports = router;