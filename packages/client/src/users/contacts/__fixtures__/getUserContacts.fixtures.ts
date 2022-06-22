import { rest, RestHandler } from 'msw';
import type { UserContactResponse } from '../types';

const path = '/api/account/v1/users/:userId/contacts';

const fixtures = {
  success: (response: UserContactResponse[]): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;