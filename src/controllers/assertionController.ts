import { Request, Response } from "express";
const Assertion = require('../models/assertion');
const tools = require('../bin/tools');

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