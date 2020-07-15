import { Request, Response } from "express";
let BadgeClass = require('../models/badgeClass');

const tools = require('../bin/tools');

exports.badgeClass_list = function(req: Request, res: Response) {
    BadgeClass.find({})
        .sort([['name', 'ascending']])
        .exec(function (err: Error, list_badgeClasses: Array<any>) {
            let list: any[]  = [];
            list_badgeClasses.forEach(badgeClass =>  {
                list = list.concat([tools.server_url + badgeClass.id])
            });
            res.json( {badgeClasses: list} )
        });
};

exports.badgeClass_detail = function(req: Request, res: Response) {
    //TODO
};