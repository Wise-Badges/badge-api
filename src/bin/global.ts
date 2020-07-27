export const SERVER_URL = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;
export const FRONTEND_URL = 'https://wisebadges.osoc.be';
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

import { pick } from 'filter-anything';

export function paginatedResults(model: any, route: string) {
  return async (req: any, res: any, next: any) => {
    const page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || DEFAULT_LIMIT);

    if (limit > MAX_LIMIT) limit = 50;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = Object();

    results.current = SERVER_URL + route + '/?page=' + page + '&limit=' + limit;

    const itemcount = await model.countDocuments().exec();
    results.totalPageCount = Math.ceil(itemcount / limit);
    results.limit = limit;

    if (endIndex < itemcount) {
      results.next = SERVER_URL + route + '/?page=' + (page + 1) + '&limit=' + limit;
      if (req.query.fields) results.next += '&fields=' + req.query.fields;
    }

    if (startIndex > 0) {
      results.previous = SERVER_URL + route + '/?page=' + (page - 1) + '&limit=' + limit;
      if (req.query.fields) results.previous += '&fields=' + req.query.fields;
    }

    try {
      let data = await model.find().limit(limit).skip(startIndex).exec();
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
