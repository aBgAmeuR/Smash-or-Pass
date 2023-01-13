const SmashList = require("../Services/SmashList");
const { SendSuccess } = require("../helpers/SendMessage");
const { SmashListCover } = require("../helpers/CompressIMG");
const fs = require('fs');

exports.CreateSmashList = async (req, res, next) => {
  try {
    if (fs.existsSync(`./img/${req.body.name}`)) {
      fs.unlinkSync(`./uploads/${req.file.filename}`)
      return next({ status: 409, message: "SmashList already exist" });
    }
    const user = req.user.Pseudo_U;
    const { name, description, categorie } = req.body;
    if (!name || !description || !categorie || !user) {
      fs.unlinkSync(`./uploads/${req.file.filename}`)
      return next({ status: 400, message: "Missing input"});
    }
    try {
      const smashlist = await SmashList.CreateSmashList(name, description, categorie, user);
      res.status(201).send({ error: false, message: "User created"});

      fs.mkdirSync(`./img/${req.body.name}`);
      SmashListCover(`./uploads/${req.file.filename}`, req.body.name).then((info) => {
      fs.unlinkSync(`./uploads/${req.file.filename}`)
      })
    } catch (error) {
      fs.unlinkSync(`./uploads/${req.file.filename}`)
      return next({ status: 409, message: "SmashList already exist" });
    }
  } catch (error) {
    fs.unlinkSync(`./uploads/${req.file.filename}`)
    next({ status: 500, message: "Internal Server Error" });
  }
};