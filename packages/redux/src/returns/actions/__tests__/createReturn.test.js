import { mockStore } from '../../../../tests';
import { postReturn } from '@farfetch/blackout-client/returns';
import {
  responses,
  returnsNormalizedPayload,
} from 'tests/__fixtures__/returns';
import createReturn from '../../actions/createReturn';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

jest.mock('@farfetch/blackout-client/returns', () => ({
  ...jest.requireActual('@farfetch/blackout-client/returns'),
  postReturn: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('createReturn() action creator', () => {
  const query = {};
  const expectedConfig = undefined;
  let store;

  const data = { ...responses.post.success };

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions when the create return request fails', async () => {
    const expectedError = new Error('create return error');

    postReturn.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(createReturn(data, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postReturn).toHaveBeenCalledTimes(1);
      expect(postReturn).toHaveBeenCalledWith(data, query, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.CREATE_RETURN_REQUEST },
          {
            type: actionTypes.CREATE_RETURN_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the create checkout procedure is successful', async () => {
    postReturn.mockResolvedValueOnce(responses.post.success);

    await store.dispatch(createReturn(data, query));

    const actionResults = store.getActions();

    expect(postReturn).toHaveBeenCalledTimes(1);
    expect(postReturn).toHaveBeenCalledWith(data, query, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.CREATE_RETURN_REQUEST },
      {
        payload: returnsNormalizedPayload,
        type: actionTypes.CREATE_RETURN_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.CREATE_RETURN_SUCCESS,
      }),
    ).toMatchSnapshot('create return success payload');
  });
});