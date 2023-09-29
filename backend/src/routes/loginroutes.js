const express = require('express');
const showdataController = require('../controllers/login');
const itemController = require('../controllers/itemController');

const router = express.Router();


router.post('/api/login',showdataController.apilogin);
router.post('/api/register', showdataController.register);
router.get('/api/check-username/:username', showdataController.usernameavailability);
router.get('/api/check-email/:email', showdataController.email_availability);

router.post('/items', itemController.createItem);

router.get('/items', itemController.getItems);


module.exports = router;