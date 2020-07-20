export {};

const express = require('express');
const router = express.Router();
const assertion_controller = require('../controllers/assertionController');

router.get('/:id', assertion_controller.assertion_detail);

router.post('/', assertion_controller.assertion_create);

router.patch('/:id', assertion_controller.assertion_accept);

router.delete('/:id', assertion_controller.assertion_delete);

//get verifiable open badge
router.get('/:id/badge', assertion_controller.assertion_badge);

module.exports = router;
