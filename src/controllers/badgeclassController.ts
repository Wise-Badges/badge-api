import { Request, Response } from 'express';
const badgeclass = require('../models/badgeclass');
const global = require('../bin/global');

//TODO: any -> correct type

exports.listBadgeclasses = function (req: Request, res: Response) {
  badgeclass.find({}).exec(function (err: Error, badgeclasses: Array<any>) {
    const list = badgeclasses.map((badgeclass) => ({
      tag: badgeclass.tag,
      id: global.SERVER_URL + badgeclass.id
    }));
    res.json({ badgeclasses: list });
  });
};

exports.showBadgeclassDetails = function (req: Request, res: Response) {
  badgeclass.findById(req.params.id).exec(function (err: Error, badgeclass: any) {
    if (badgeclass == null) {
      return res.status(404).send();
    }
    let bc = badgeclass.toJSON();
    //make URL/ID absolute
    bc.id = global.SERVER_URL + bc.id;
    res.json(bc);
  });
};
