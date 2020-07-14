let express = require('express');
let router = express.Router();
let Issuer = require('../models/issuer');
import {Request, Response} from 'express';

// GET request for "home page": give links to all possibilities
// TODO: add actual absolute URL
router.get('/', (req: Request, res: Response): void => {
    res.status(200).send({ 
      badges: '/badges' ,
      badgeclasses: '/badgeclasses',
      issuer: '/issuer',
    });
  });

// GET request for issuer (there will only be one for now - WISE badges -, maybe in future versions multiple sites will want to use this API)
router.get('/issuer', (req: Request, res: Response): void => {
  Issuer.findOne()
  .exec(function (err: Error, issuer: Object) {
      if (err) { res.status(404) }
      else {
        res.json(issuer)
      }
  });
})

module.exports = router;
