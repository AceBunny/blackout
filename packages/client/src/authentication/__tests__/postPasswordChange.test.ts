import { postPasswordChange } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPasswordChange.fixtures';
import moxios from 'moxios';

describe('postPasswordChange', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const userId = 123123;
  const data = {
    oldPassword: 'thisisOLDpassword',
    newPassword: 'thisisNEWpassword',
    userId,
    username: 'pepe',
  };

  it('should handle a client request successfully', async () => {
    fixtures.success({ data });

    expect.assertions(2);
    await expect(postPasswordChange(data)).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/passwordchange`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ data });

    expect.assertions(2);
    await expect(postPasswordChange(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/passwordchange`,
      data,
      expectedConfig,
    );
  });
});