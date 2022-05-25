import {
  FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE,
  FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST,
  FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetOrderAvailableItemsActivities } from '@farfetch/blackout-client/orders/types';

const fetchOrderAvailableItemsActivities =
  (getOrderAvailableItemsActivities: GetOrderAvailableItemsActivities) =>
  (orderId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST,
    });

    try {
      const result = await getOrderAvailableItemsActivities(orderId, config);

      dispatch({
        type: FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchOrderAvailableItemsActivities;