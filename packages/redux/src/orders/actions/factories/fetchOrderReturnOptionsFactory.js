import {
  FETCH_ORDER_RETURN_OPTIONS_FAILURE,
  FETCH_ORDER_RETURN_OPTIONS_REQUEST,
  FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import returnOption from '../../../entities/schemas/returnOption';

/**
 * @callback FetchOrderReturnOptionsThunkFactory
 * @param {string} orderId - The order id to get details from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetches order return options.
 *
 * @function fetchOrderReturnOptions
 * @memberof module:orders/actions
 *
 * @param {Function} getOrderReturnOptions - Get order return options client.
 *
 * @returns {FetchOrderReturnOptionsThunkFactory} Thunk factory.
 */
export default getOrderReturnOptions => (orderId, config) => async dispatch => {
  dispatch({
    meta: { orderId },
    type: FETCH_ORDER_RETURN_OPTIONS_REQUEST,
  });

  try {
    const result = await getOrderReturnOptions(orderId, config);

    dispatch({
      meta: { orderId },
      payload: normalize(result, [{ options: [returnOption] }]),
      type: FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      meta: { orderId },
      payload: { error },
      type: FETCH_ORDER_RETURN_OPTIONS_FAILURE,
    });

    throw error;
  }
};