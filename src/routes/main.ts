const express = require('express');
const router = express.Router();
import Issuer, { IssuerDocument } from '../models/issuer';
import Assertion from '../models/assertion';
import Badgeclass from '../models/badgeclass';
const global = require('../bin/global');
const badgeclassController = require('../controllers/badgeclassController');
const assertionController = require('../controllers/assertionController');
import { Request, Response } from 'express';

//TODO: strings like '/assertions' etc to global variables, as they are needed in other functions (like in global.ts) as well

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
  Issuer.findOne().exec(function (err: Error, issuer: IssuerDocument) {
    if (err) {
      return res.status(404).send();
    }
    return res.json(issuer);
  });
});

// GET request for all badge classes
router.get(
  '/badgeclasses',
  global.paginatedResults(Badgeclass, '/badgeclasses'),
  badgeclassController.listBadgeclasses
);

// GET request for all assertions
router.get(
  '/assertions',
  global.paginatedResults(Assertion, '/assertions'),
  assertionController.listAssertions
);

module.exports = router;
