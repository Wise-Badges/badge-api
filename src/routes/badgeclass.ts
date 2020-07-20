export {};

const express = require('express');
const router = express.Router();
const badgeclassController = require('../controllers/badgeclassController');

router.get('/:id', badgeclassController.showBadgeclassDetails);

module.exports = router;
