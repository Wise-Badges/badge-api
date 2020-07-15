export {}

const express = require('express');
const router = express.Router();
const assertion_controller = require('../controllers/assertionController');

router.get('/:id', assertion_controller.assertion_detail)

router.post('/', assertion_controller.assertion_create)

module.exports = router;

