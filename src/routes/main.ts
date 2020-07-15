let express = require('express');
let router = express.Router();
let Issuer = require('../models/issuer');
let tools = require('../bin/tools')
import {Request, Response} from 'express';

// GET request for "home page": give links to all possibilities
router.get('/', (req: Request, res: Response): void => {
    res.status(200).send({ 
      badges: tools.server_url + '/badges' ,
      badgeclasses: tools.server_url + '/badgeclass/list',
      issuer: tools.server_url + '/issuer',
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
