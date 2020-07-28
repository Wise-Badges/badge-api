export {};

const express = require('express');
const router = express.Router();
const badgeclassController = require('../controllers/badgeclassController');
const global = require('../bin/global');
import Assertion from '../models/assertion';

router.get('/:id', badgeclassController.showBadgeclassDetails);

router.get(
  '/:id/assertions',
  global.paginatedResults(Assertion, '/badgeclass', '/assertions'),
  badgeclassController.showBadgeclassAssertions
);

module.exports = router;
