export {};

const express = require('express');
const router = express.Router();
const assertionController = require('../controllers/assertionController');

router.get('/:id', assertionController.showAssertionDetails);

router.post('/', assertionController.createAssertion);

router.patch('/:id', assertionController.acceptAssertion);

router.delete('/:id', assertionController.deleteAssertion);

router.patch('/:id/answer', assertionController.addAnswerToAssertion);

//get verifiable open badge
router.get('/:id/badge', assertionController.getDownloadableBadge);

module.exports = router;
