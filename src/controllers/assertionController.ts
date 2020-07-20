import { Request, Response } from 'express';
const Assertion = require('../models/assertion');
const Badgeclass = require('../models/badgeclass');
const global = require('../bin/global');
const async = require('async');
const request = require('request');
const bakery = require('openbadges-bakery-v2');

//TODO: any -> correct type

exports.assertion_list = function (req: Request, res: Response) {
  Assertion.find({}).exec(function (err: Error, list_assertions: Array<any>) {
    let list: any[] = [];
    list_assertions.forEach((assertion) => {
      list = list.concat([global.SERVER_URL + assertion.id]);
    });
    res.json({ assertions: list });
  });
};

exports.assertion_detail = function (req: Request, res: Response) {
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

exports.assertion_create = function (req: Request, res: Response) {
  let assertion = new Assertion({
    '@context': 'https://w3id.org/openbadges/v2',
    recipient: {
      type: 'url',
      hashed: false,
      identity: req.body.receiver,
      name: req.body.receiverName
    },
    sender: { identity: req.body.sender, name: req.body.senderName },
    type: 'Assertion',
    badge: req.body.badgeclass,
    issuedOn: new Date().toString(),
    evidence: {
      id: req.body.reason,
      narrative: 'Issued with ' + req.body.platform + 'by ' + req.body.receiverName + '.'
    },
    verfication: { type: 'hosted' }
  });

  assertion.save(function (err: Error) {
    //TODO: is this error handling correct
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(global.SERVER_URL + assertion.id);
    }
  });
};

//TODO: any type & custom types for assertions

exports.assertion_accept = function (req: Request, res: Response) {
  Assertion.findByIdAndUpdate(req.params.id, { $set: { accepted: true } }, { new: false })
    .then((assertion: any) => {
      res.status(200).send(global.SERVER_URL + assertion.id);
    })
    .catch((err: Error) => {
      res.send(err);
    });
};

exports.assertion_delete = function (req: Request, res: Response) {
  Assertion.findByIdAndDelete(req.params.id, (err: Error, docs: any) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send();
    }
  });
};

// TODO: refactor needed D:, splits in verschillende delen
exports.assertion_badge = function (req: Request, res: Response) {
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
