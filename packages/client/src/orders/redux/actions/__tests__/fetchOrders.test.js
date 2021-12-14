import * as normalizr from 'normalizr';
import {
  expectedNormalizedPayload,
  mockOrdersResponse,
} from '../../__fixtures__/orders.fixtures';
import { fetchOrders } from '../';
import { mockStore } from '../../../../../tests';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const userId = 112233;
const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: reducer() }, state, mockMiddlewares);
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
const expectedConfig = undefined;
let store;

describe('fetchOrders() action creator', () => {
  const getOrders = jest.fn();
  const action = fetchOrders(getOrders);
  const query = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the fetch orders procedure fails', async () => {
    const expectedError = new Error('fetch orders error');

    getOrders.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(action(userId, query)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getOrders).toHaveBeenCalledTimes(1);
      expect(getOrders).toHaveBeenCalledWith({ query, userId }, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_ORDERS_REQUEST },
          {
            payload: { error: expectedError },
            type: actionTypes.FETCH_ORDERS_FAILURE,
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the fetch orders procedure is successful', async () => {
    getOrders.mockResolvedValueOnce(mockOrdersResponse);

    expect.assertions(5);

    await store.dispatch(action(userId, query)).then(clientResult => {
      expect(clientResult).toEqual(mockOrdersResponse);
    });

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getOrders).toHaveBeenCalledTimes(1);
    expect(getOrders).toHaveBeenCalledWith({ query, userId }, expectedConfig);
    expect(store.getActions()).toEqual([
      { type: actionTypes.FETCH_ORDERS_REQUEST },
      {
        payload: expectedNormalizedPayload,
        type: actionTypes.FETCH_ORDERS_SUCCESS,
      },
    ]);
  });
});