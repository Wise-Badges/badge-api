const express = require('express');
const router = express.Router();
const Issuer = require('../models/issuer');
const tools = require('../bin/tools');
const badgeClass_controller = require('../controllers/badgeClassController');
const assertion_controller = require('../controllers/assertionController');
import {Request, Response} from 'express';

// GET request for "home page": give links to all possibilities
router.get('/', (req: Request, res: Response): void => {
    res.status(200).send({ 
      assertions: tools.server_url + '/assertions' ,
      badgeclasses: tools.server_url + '/badgeclasses',
      issuer: tools.server_url + '/issuer',
    });
  });

// GET request for issuer (there will only be one for now - WISE badges)
router.get('/issuer', (req: Request, res: Response): void => {
  Issuer.findOne()
  .exec(function (err: Error, issuer: Object) {
      if (err) { res.status(404) }
      else {
        res.json(issuer)
      }
  });
})

// GET request for all badge classes
router.get('/badgeclasses', badgeClass_controller.badgeClass_list);

// GET request for all assertions
router.get('/assertions', assertion_controller.assertion_list)

module.exports = router;
