const express = require('express');
const router = express.Router();
const Issuer = require('../models/issuer');
const global = require('../bin/global');
const badgeclassController = require('../controllers/badgeclassController');
const assertionController = require('../controllers/assertionController');
import { Request, Response } from 'express';

// GET request for "home page": give links to all possibilities
router.get('/', (req: Request, res: Response): void => {
  res.status(200).send({
    assertions: global.SERVER_URL + '/assertions',
    badgeclasses: global.SERVER_URL + '/badgeclasses',
    issuer: global.SERVER_URL + '/issuer'
  });
});

// GET request for issuer (there will only be one for now - WISE badges)
router.get('/issuer', (req: Request, res: Response): void => {
  Issuer.findOne().exec(function (err: Error, issuer: Object) {
    if (err) {
      return res.status(404).send();
    }
    return res.json(issuer);
  });
});

// GET request for all badge classes
router.get('/badgeclasses', badgeclassController.listBadgeclasses);

// GET request for all assertions
router.get('/assertions', assertionController.listAssertions);

module.exports = router;
