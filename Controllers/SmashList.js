const SmashList = require("../Services/SmashList");
const { SendSuccess } = require("../helpers/SendMessage");
const { SmashListCover, SmashListItem, SendItemImage } = require("../helpers/CompressIMG");
const fs = require('fs');

exports.CreateSmashList = async (req, res, next) => {
  try {
    if (fs.existsSync(`./img/${req.body.name}`)) {
      fs.unlinkSync(`./uploads/${req.file.filename}`)
      return next({ status: 409, message: "SmashList already exist" });
    }
    const user = req.user.Pseudo_U;
    const { name, description, category } = req.body;
    if (!name || !description || !category || !user) {
      fs.unlinkSync(`./uploads/${req.file.filename}`)
      return next({ status: 400, message: "Missing input"});
    }
    try {
      const smashlist = await SmashList.CreateSmashList(name, description, category, user);
      res.status(201).send({ error: false, message: "Smash List created"});

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

exports.AddItemSmashList = async (req, res, next) => {
  try {
    const lengthFile = await (await fs.promises.readdir(`./img/${req.body.list}`)).length;
    const { list, name, description } = req.body;
    if (!list || !name || !description) {
      fs.unlinkSync(`./uploads/${req.file.filename}`)
      return next({ status: 400, message: "Missing input" });
    }
    try {
      const item = await SmashList.AddItemSmashList(lengthFile, name, description, list);
      res.status(201).send({ error: false, message: "Item added" });
      
      SmashListItem(`./uploads/${req.file.filename}`, req.body.list, lengthFile).then((info) => {
        fs.unlinkSync(`./uploads/${req.file.filename}`)
      });
    } catch (error) {
      fs.unlinkSync(`./uploads/${req.file.filename}`)
      return next({ status: 409, message: "Item already exist" });
    }
  } catch (error) {
    fs.unlinkSync(`./uploads/${req.file.filename}`)
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.GetSmashListItems = async (req, res, next) => {
  try {
    const NameList = req.body.name;
    const Items = await SmashList.GetSmashListItems(NameList)
    const ItemsList = await SendItemImage(NameList, Items);
    if (ItemsList.length == 0) return next({ status: 404, message: "SmashList not found" });
    res.status(200).send({ error: false, message: "SmashList found", data: ItemsList });
  } catch (error) {
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.GetSmashList = async (req, res, next) => {
  try {
    const NameList = req.body.name;
    const Smashlist = await SmashList.GetSmashList(NameList);
    if (!Smashlist) return next({ status: 404, message: "SmashList not found" });
    res.status(200).send({ error: false, message: "SmashList found", data: Smashlist });
  } catch (error) {
    console.log(error);
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.GetSmashListLength = async (req, res, next) => {
  try {
    const NameList = req.body.name;
    const Smashlist = await SmashList.GetSmashListLength(NameList);
    if (!Smashlist) return next({ status: 404, message: "SmashList not found" });
    res.status(200).send({ error: false, message: "SmashList found", data: Smashlist });
  } catch (error) {
    console.log(error);
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.GetSmashListFromUser = async (req, res, next) => {
  try {
    const User = req.body.username;
    const Smashlist = await SmashList.GetSmashListFromUser(User);
    if (!Smashlist) return next({ status: 404, message: "SmashList not found" });
    res.status(200).send({ error: false, message: "SmashList found", data: Smashlist });
  } catch (error) {
    console.log(error);
    next({ status: 500, message: "Internal Server Error" });
  }
};

exports.GetSmashListFromCategory = async (req, res, next) => {
  try {
    const Category = req.body.category;
    const Smashlist = await SmashList.GetSmashListFromCategory(Category);
    if (!Smashlist) return next({ status: 404, message: "SmashList not found" });
    res.status(200).send({ error: false, message: "SmashList found", data: Smashlist });
  } catch (error) {
    console.log(error);
    next({ status: 500, message: "Internal Server Error" });
  }
};