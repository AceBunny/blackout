import { getSubscriptions } from '..';
import { mockGetSubscriptions } from 'tests/__fixtures__/subscriptions';
import client from '../../helpers/client';
import join from 'proper-url-join';
import moxios from 'moxios';
import moxiosFixtures from '../__fixtures__/getSubscriptions.fixtures';

describe('getSubscriptions', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    moxiosFixtures.success(
      mockGetSubscriptions.query,
      mockGetSubscriptions.response,
    );

    await expect(getSubscriptions(mockGetSubscriptions.query)).resolves.toBe(
      mockGetSubscriptions.response,
    );

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: mockGetSubscriptions.query,
      }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    moxiosFixtures.failure(mockGetSubscriptions.query);

    await expect(
      getSubscriptions(mockGetSubscriptions.query),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/marketing/v1/subscriptions', {
        query: mockGetSubscriptions.query,
      }),
      expectedConfig,
    );
  });
});