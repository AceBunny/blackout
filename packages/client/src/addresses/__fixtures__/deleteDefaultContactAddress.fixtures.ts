import { rest, RestHandler } from 'msw';

const path = '/api/account/v1/users/:userId/addresses/preferred/current';

export default {
  success: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.delete(path, async (_req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({
          errors: [
            {
              code: 0,
              message: 'error',
              developerMessage: 'This is developer message',
              moreInformation: 'Error more information',
              exception: {},
            },
          ],
        }),
      ),
    ),
};
