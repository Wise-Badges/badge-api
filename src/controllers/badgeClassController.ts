import { Request, Response } from "express";
const BadgeClass = require('../models/badgeClass');
const tools = require('../bin/tools');

//TODO: any -> correct type

exports.badgeClass_list = function(req: Request, res: Response) {
    BadgeClass.find({})
        .exec(function (err: Error, list_badgeClasses: Array<any>) {
            let list: any[]  = [];
            list_badgeClasses.forEach(badgeClass =>  {
                list = list.concat([tools.server_url + badgeClass.id])
            });
            res.json( {badgeClasses: list} )
        });
};

exports.badgeClass_detail = function(req: Request, res: Response) {
    BadgeClass.findById(req.params.id)
        .exec(function (err: Error, badgeClass: any) {
            if (badgeClass == null) {
                res.status(404).send();
                return;
            }
            let bc = badgeClass.toJSON();
            //make URL/ID absolute
            bc.id = tools.server_url + bc.id;
            res.json(bc);
            }
        );
};