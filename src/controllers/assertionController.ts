import { Request, Response } from "express";
const Assertion = require('../models/assertion');
const tools = require('../bin/tools');
const async = require("async");
const bakery = require('openbadges-bakery-v2'); 
/** unofficial bakery because the official one isn't supported by Mozilla anymore **/

//TODO: any -> correct type

exports.assertion_list = function(req: Request, res: Response) {
    Assertion.find({})
        .exec(function (err: Error, list_assertions: Array<any>) {
            let list: any[]  = [];
            list_assertions.forEach(assertion =>  {
                list = list.concat([tools.server_url + assertion.id])
            });
            res.json( {assertions: list} )
        });
};


exports.assertion_detail = function(req: Request, res: Response) {
    Assertion.findById(req.params.id)
        .exec(function (err: Error, assertion: any) {
            if (assertion == null) {
                res.status(404).send();
            }
            else {
                let as = assertion.toJSON();
                //make URL/ID absolute
                as.id = tools.server_url + as.id;
                res.json(as);
            }
        });
};

exports.assertion_create = function(req: Request, res: Response) {
    let assertion = new Assertion(
        {  "@context":  "https://w3id.org/openbadges/v2",
        recipient: {type: "url", hashed: false, identity: req.body.receiver, name: req.body.receiverName},
        sender: {identity: req.body.sender, name: req.body.senderName},
        type: "Assertion",
        badge: req.body.badgeclass,
        issuedOn: new Date().toString(),
        evidence: {id: req.body.reason },
        verfication: { type: "hosted" }
        });

    assertion.save(function (err: Error) {
        //TODO: is this error handling correct
        if (err) { 
            res.send(err)}
        else {
            res.status(200).send(tools.server_url + assertion.id);
        }
    });

};


//TODO: any type

exports.assertion_accept =  function(req: Request, res: Response) {
    Assertion.findByIdAndUpdate(req.params.id,
        {$set: {accepted: true}},
        {new: false})
        .then((assertion: any) => { 
            res.status(200).send(tools.server_url + assertion.id)
        })
        .catch((err: Error) => {
            res.send(err)
        });
};

exports.assertion_delete = function(req: Request, res: Response) {
    Assertion.findByIdAndDelete(req.params.id, (err: Error, docs: any) => { 
        if (err){ 
            res.send(err);
        } else { 
            res.status(200).send();
        } 
    });
};

exports.assertion_badge = function(req: Request, res: Response) {
    let assertion = {"recipient":{"type":"url","hashed":false,"identity":"https://twitter.com/Sarah_VanDenB","name":"@sarah_vandenb"},"sender":{"identity":"https://twitter.com/fvspeybr","name":"@fvspeybr"},"evidence":{"id":"https://twitter.com/fvspeybr/status/1283302666005811200"},"accepted":true,"@context":"https://w3id.org/openbadges/v2","type":"Assertion","badge":"http://localhost:5000/badgeclass/5f0ebd0ba72c486d5a56d849","issuedOn":"2020-07-15T09:10:05+00:00","verification":{"type":"hosted"},"id":"http://localhost:5000/assertion/5f0eea5ea37a3f29d3921aa8"};
    async.waterfall([
        getBadgeImage
    ], function (err: Error, badgeImage: any) {

        bakery.bake({
            image: badgeImage,
            assertion: assertion}, 
            function (err: Error, imageData: any) {
            console.log("imageData "+JSON.stringify(imageData));
                res.set('Content-Type', 'image/png')
                res.set('Content-Disposition', 'attachment; filename='+"testBadge"+'');
                res.set('Content-Length', imageData.length);
                res.end(imageData, 'binary');
                return;
        });
    });
};

function getBadgeImage(callback: any): any {
    const request = require('request');
    const options = {
        url: 'http://wisebadges.wabyte.com/WiseBadges.png',
        method: "get",
        encoding: null
    };

    request(options, function (error: Error, response: Response, body:any) {
        if (error) {
            response.send(error);
        } else {
            callback(null, body)
        }
    });
}