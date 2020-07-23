exports.SERVER_URL = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;
exports.FRONTEND_URL = 'https://wisebadges.be';
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export function paginatedResults(model: any) {
  return async (req: any, res: any, next: any) => {
    const page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || DEFAULT_LIMIT);

    if (limit > MAX_LIMIT) limit = 50;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = Object();

    results.current = {
      page: page,
      limit: limit
    };

    const itemcount = await model.countDocuments().exec();
    results.totalPageCount = Math.ceil(itemcount / limit);

    if (endIndex < itemcount) {
      results.next = {
        page: page + 1,
        limit: limit
      };
      results.hasNext = true;
    } else {
      results.hasNext = false;
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
      results.hasPrevious = true;
    } else {
      results.hasPrevious = false;
    }

    try {
      results.data = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}
