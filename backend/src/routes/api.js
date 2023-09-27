// routes/api.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Create a new item
router.post('/items', itemController.createItem);

// Get all items
router.get('/items', itemController.getItems);

module.exports = router;
