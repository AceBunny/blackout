import { rest, RestHandler } from 'msw';
import type { GetCheckoutOrderResponse } from '../types';

const path = '/api/checkout/v1/orders';

const fixtures = {
  success: (response: GetCheckoutOrderResponse): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;