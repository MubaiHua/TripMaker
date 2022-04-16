const express = require('express');
const mapController = require('../controller/mapController');
const router = express.Router();

router.route('/createMap').post(mapController.createMap);

module.exports = router;