let express = require('express');
let router = express.Router();
import {Request, Response} from 'express';

// GET request for "home page": give links to all possibilities
router.get('/', (req: Request, res: Response): void => {
    res.status(200).send({ 
      badges: '/badges' ,
      badgeclasses: '/badgeclasses',
      issuer: '/issuer',
    });
  });

module.exports = router;
