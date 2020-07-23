import { Request, Response } from 'express';
import Badgeclass, { BadgeclassDocument } from '../models/badgeclass';

exports.listBadgeclasses = function (req: Request, res: any) {
  Badgeclass.find({}).exec(function () {
    res.json(res.paginatedResults);
  });
};

exports.showBadgeclassDetails = function (req: Request, res: Response) {
  Badgeclass.findById(req.params.id).exec(function (err: Error, badgeclass: BadgeclassDocument) {
    if (badgeclass == null) {
      return res.status(404).send();
    }
    res.json(badgeclass.toJSON());
  });
};
