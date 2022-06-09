import { rest, RestHandler } from 'msw';

const path = '/api/account/v1/orders/:orderId/:documents/:fileId';

export default {
  success: (response: string): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
