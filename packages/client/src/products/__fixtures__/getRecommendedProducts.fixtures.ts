import { rest, RestHandler } from 'msw';

const path = '/api/marketing/v1/recommendations/products';

const fixtures = {
  success: (response: Record<string, unknown>): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;