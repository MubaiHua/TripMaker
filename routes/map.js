const express = require('express');
const mapController = require('../controller/mapController');
const router = express.Router();

router.route('/createMap').post(mapController.createMap);
router.route('/updateMap').post(mapController.updateMap);
router.route('/getMap').post(mapController.getMap);
router.route('/findCode').post(mapController.findCode);

module.exports = router;

