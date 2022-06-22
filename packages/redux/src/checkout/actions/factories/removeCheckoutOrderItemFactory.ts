import {
  REMOVE_CHECKOUT_ORDER_ITEM_FAILURE,
  REMOVE_CHECKOUT_ORDER_ITEM_REQUEST,
  REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { DeleteCheckoutOrderItem } from '@farfetch/blackout-client/checkout/types/deleteCheckoutOrderItem.types';
import type { Dispatch } from 'redux';

/**
 * Method responsible for deleting a checkout order item.
 *
 * @param deleteCheckoutOrderItem - Delete checkout order item client.
 *
 * @returns Thunk factory.
 */
const removeCheckoutOrderItemFactory =
  (deleteCheckoutOrderItem: DeleteCheckoutOrderItem) =>
  /**
   * @param checkoutOrderId - Universal identifier of the Checkout Order
   * @param itemId - Order item Identifier
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Thunk to be dispatched to the redux store.
   */
  (checkoutOrderId: number, itemId: number, config?: Config) =>
  async (dispatch: Dispatch): Promise<number> => {
    dispatch({
      type: REMOVE_CHECKOUT_ORDER_ITEM_REQUEST,
    });

    try {
      const result = await deleteCheckoutOrderItem(
        checkoutOrderId,
        itemId,
        config,
      );

      dispatch({
        type: REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: REMOVE_CHECKOUT_ORDER_ITEM_FAILURE,
      });

      throw error;
    }
  };

export default removeCheckoutOrderItemFactory;