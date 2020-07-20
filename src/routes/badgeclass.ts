export {};

const express = require('express');
const router = express.Router();
const badgeclass_controller = require('../controllers/badgeclassController');

router.get('/:id', badgeclass_controller.badgeclass_detail);

module.exports = router;
