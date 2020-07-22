import { Request, Response } from 'express';
import Badgeclass, { BadgeclassDocument } from '../models/badgeclass';
const global = require('../bin/global');

exports.listBadgeclasses = function (req: Request, res: Response) {
  Badgeclass.find({}).exec(function (err: Error, badgeclasses: Array<BadgeclassDocument>) {
    const list = badgeclasses.map((badgeclass) => ({
      tag: badgeclass.tag,
      id: global.SERVER_URL + badgeclass.id
    }));
    res.json({ badgeclasses: list });
  });
};

exports.showBadgeclassDetails = function (req: Request, res: Response) {
  Badgeclass.findById(req.params.id).exec(function (err: Error, badgeclass: BadgeclassDocument) {
    if (badgeclass == null) {
      return res.status(404).send();
    }
    let bc = badgeclass.toJSON();
    //make URL/ID absolute
    bc.id = global.SERVER_URL + bc.id;
    res.json(bc);
  });
};
