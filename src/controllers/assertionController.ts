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
                return;
            }
            let as = assertion.toJSON();
            //make URL/ID absolute
            as.id = tools.server_url + as.id;
            res.json(as);
            }
        );
};

exports.assertion_create = function(req: Request, res: Response) {
    //TODO
};