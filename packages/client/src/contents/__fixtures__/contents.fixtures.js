import { rest } from 'msw';

const path = '/api/content/v1/search/contents';

/**
 * Response payloads.
 */
export default {
  get: {
    /**
     * Success msw request.
     *
     * @param {object} response - Contents payload.
     */
    success: response =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    /**
     * Failure msw request.
     */
    failure: () =>
      rest.get(path, async (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};