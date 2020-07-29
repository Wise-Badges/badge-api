export const SERVER_URL = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;
export const FRONTEND_URL = 'https://wisebadges.osoc.be';
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

import { pick } from 'filter-anything';
import Assertion, { AssertionDocument } from '../models/assertion';

//TODO: refactor?
export function paginatedResults(model: any, route: string, routeExtra: string = '') {
  return async (req: any, res: any, next: any) => {
    try {
      const page = parseInt(req.query.page || 1);
      let limit = parseInt(req.query.limit || DEFAULT_LIMIT);
      const accepted = req.query.accepted;
      let actualRoute = route;
      let findParameter = Object();
      let acceptedString = '';

      //check if this is special route
      if (routeExtra !== '') {
        actualRoute = route + '/' + req.params.id + routeExtra;
        findParameter.badge = SERVER_URL + '/badgeclass/' + req.params.id;
      }

      //limit can't be higher than 50
      if (limit > MAX_LIMIT) limit = 50;

      //if client only wants to see the accepted/unaccepted assertions (not a valid option for /badgeclasses)
      if (accepted && route != '/badgeclasses') {
        findParameter.accepted = accepted;
        acceptedString = '&accepted=' + accepted;
      }

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = Object();

      results.current =
        SERVER_URL + actualRoute + '/?page=' + page + '&limit=' + limit + acceptedString;

      const itemcount = await model.find(findParameter).countDocuments().exec();
      results.totalPageCount = Math.ceil(itemcount / limit);
      results.totalItemCount = itemcount;
      results.limit = limit;

      if (endIndex < itemcount) {
        results.next =
          SERVER_URL + actualRoute + '/?page=' + (page + 1) + '&limit=' + limit + acceptedString;
        if (req.query.fields) results.next += '&fields=' + req.query.fields;
      }

      if (startIndex > 0) {
        results.previous =
          SERVER_URL + actualRoute + '/?page=' + (page - 1) + '&limit=' + limit + acceptedString;
        if (req.query.fields) results.previous += '&fields=' + req.query.fields;
      }

      let data = await model
        .find(findParameter)
        .sort({ issuedOn: -1 }) //sort for assertions
        .sort({ name: 1 }) //sort for badgeclasses
        .limit(limit)
        .skip(startIndex)
        .exec();
      if (req.query.fields) {
        results.current += '&fields=' + req.query.fields; //add fields to current page link
        const filter = req.query.fields.toString().split(','); //make array for what fields to filter on
        results.data = data.map((d: any) => pick(d.toJSON(), filter)); //only show fields specified in "fields" query parameter
      } else {
        results.data = data; //show all fields if no fields are specified
      }
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}

export function removeAssertions() {
  Assertion.find({ accepted: false }).exec(function (
    err: Error,
    assertions: Array<AssertionDocument>
  ) {
    assertions.forEach((assertion) => {
      const timeDifference = new Date().getTime() - assertion.issuedOn.getTime();
      const dayDifference = timeDifference / (1000 * 3600 * 24);
      if (dayDifference > 14) {
        //delete assertion if after two weeks it still hasn't been accepted
        Assertion.findByIdAndDelete(assertion._id).exec();
      }
    });
  });
}
