import { Request, Response } from 'express';
const badgeclass = require('../models/badgeclass');
const global = require('../bin/global');

//TODO: any -> correct type

exports.badgeclass_list = function (req: Request, res: Response) {
  badgeclass.find({}).exec(function (err: Error, list_badgeclasses: Array<any>) {
    const list = list_badgeclasses.map((badgeclass) => global.SERVER_URL + badgeclass.id);
    res.json({ badgeclasses: list });
  });
};

exports.badgeclass_detail = function (req: Request, res: Response) {
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
