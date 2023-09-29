// controllers/itemController.js
const Item = require('../models/item');

exports.createItem = async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    return res.json(items);
  } catch (err) {
    return res.status(500).send(err);
  }
};
