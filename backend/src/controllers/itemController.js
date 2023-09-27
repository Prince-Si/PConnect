// controllers/itemController.js
const Item = require('../models/item');

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    return res.json(items);
  } catch (err) {
    return res.status(500).send(err);
  }
};
