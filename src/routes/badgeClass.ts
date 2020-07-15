export {}

const express = require('express');
const router = express.Router();
const badgeClass_controller = require('../controllers/badgeClassController');

router.get('/:id', badgeClass_controller.badgeClass_detail)

module.exports = router;

