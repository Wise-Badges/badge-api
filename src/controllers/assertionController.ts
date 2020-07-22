import { Request, Response, NextFunction } from 'express';
const Assertion = require('../models/assertion');
const Badgeclass = require('../models/badgeclass');
const global = require('../bin/global');
const async = require('async');
const request = require('request');
const bakery = require('openbadges-bakery-v2');
const validator = require('express-validator');

//TODO: any -> correct type

exports.listAssertions = function (req: Request, res: Response) {
  Assertion.find({}).exec(function (err: Error, assertions: Array<any>) {
    const list = assertions.map((assertion) => global.SERVER_URL + assertion.id);
    res.json({ assertions: list });
  });
};

exports.showAssertionDetails = function (req: Request, res: Response) {
  Assertion.findById(req.params.id).exec(function (err: Error, assertion: any) {
    if (assertion == null) {
      res.status(404).send();
    } else {
      let as = assertion.toJSON();
      //make URL/ID absolute
      as.id = global.SERVER_URL + as.id;
      res.json(as);
    }
  });
};

//use to validate the body of POST request
const validateAssertion = [
  validator
    .body('receiver')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Receiver identifier cannot be empty.')
    .isURL()
    .withMessage('Receiver should be a URL.')
    .escape(),

  validator
    .body('receiverName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Receiver name cannot be empty.')
    .escape(),

  validator
    .body('sender')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Sender identifier cannot be empty.')
    .isURL()
    .withMessage('Sender should be a URL.')
    .escape(),

  validator
    .body('senderName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Sender name cannot be empty.')
    .escape(),

  validator
    .body('reason')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Reason cannot be empty.')
    .isURL()
    .withMessage('Reason should be a URL linking to a Twitter/Facebook/... post.')
    .escape(),

  validator
    .body('platform')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Platform cannot be empty.')
    .escape(),

  validator
    .body('badgeclass')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Badgeclass cannot be empty.')
    .isURL()
    .withMessage('Badgeclass should be a URL linking to the json of a badgeclass.')
    .escape()
];

exports.createAssertion = [
  validateAssertion,
  (req: Request, res: Response) => {
    const errors = validator.validationResult(req);
    let assertion = new Assertion({
      '@context': 'https://w3id.org/openbadges/v2',
      recipient: {
        type: 'url',
        hashed: false,
        identity: req.body.receiver,
        name: req.body.receiverName
      },
      type: 'Assertion',
      badge: req.body.badgeclass,
      issuedOn: new Date().toString(),
      evidence: {
        id: req.body.reason,
        narrative:
          'Issued with ' +
          req.body.platform +
          'by ' +
          req.body.senderName +
          ' (' +
          req.body.sender +
          ').'
      },
      verification: { type: 'hosted' },
      accepted: false
    });

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    assertion.save(function (err: Error) {
      //TODO: is this error handling correct
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({
          json: global.SERVER_URL + assertion.id,
          html: `${global.FRONTEND_URL}/badge/${assertion.id}`
        });
      }
    });
  }
];

//TODO: any type & custom types for assertions

exports.acceptAssertion = function (req: Request, res: Response) {
  Assertion.findByIdAndUpdate(req.params.id, { $set: { accepted: true } }, { new: false })
    .then((assertion: any) => {
      res.status(200).send(global.SERVER_URL + assertion.id);
    })
    .catch((err: Error) => {
      res.send(err);
    });
};

exports.deleteAssertion = function (req: Request, res: Response) {
  Assertion.findByIdAndDelete(req.params.id, (err: Error, docs: any) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send();
    }
  });
};

// TODO: refactor needed D:, splits in verschillende delen
exports.getDownloadableBadge = function (req: Request, res: Response) {
  Assertion.findById(req.params.id).exec(function (err: Error, assertion: any) {
    if (assertion == null) {
      res.status(404).send();
      return;
    }
    //assertion has a field badge which contains a URL to the badgeclass, here we are filtering the ID from the URL (it's the last part)
    Badgeclass.findById(assertion.badge.split('/').pop()).exec(function (
      err: Error,
      badgeclass: any
    ) {
      if (badgeclass == null) {
        res.status(404).send();
        return;
      }
      async.waterfall([async.apply(getBadgeImage, badgeclass.image)], function (
        err: Error,
        badgeImage: any
      ) {
        if (badgeImage == null) return;

        bakery.bake(
          {
            image: badgeImage,
            assertion: assertion.toJSON()
          },
          function (err: Error, imageData: any) {
            res.set('Content-Type', 'image/png');
            res.set('Content-Disposition', 'attachment; filename=' + badgeclass.name + '.png');
            res.set('Content-Length', imageData.length);
            res.end(imageData, 'binary');
            return;
          }
        );
      });
    });
  });
};

function getBadgeImage(image: String, callback: CallableFunction) {
  const options = {
    url: image,
    method: 'get',
    encoding: null
  };

  request(options, function (error: Error, response: Response, body: any) {
    if (error) {
      response.send(error);
      callback(null, null);
    } else {
      callback(null, body);
    }
  });
}
