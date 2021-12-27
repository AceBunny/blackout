import {
  REMOVE_ADDRESS_FAILURE,
  REMOVE_ADDRESS_REQUEST,
  REMOVE_ADDRESS_SUCCESS,
} from '../../actionTypes';
import type {
  Address,
  DeleteAddress,
  User,
} from '@farfetch/blackout-client/addresses/types';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { RemoveAddressAction } from '../../types';

/**
 * @callback RemoveAddressThunkFactory
 * @param {string} addressId - Identifier of the address.
 * @param {number} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Responsible for removing the address with the specified 'addressId'.
 *
 * @function doDeleteAddress
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} deleteAddress - Delete address client.
 *
 * @returns {RemoveAddressThunkFactory} Thunk factory.
 */
const removeAddressFactory =
  (deleteAddress: DeleteAddress) =>
  (userId: User['id'], addressId: Address['id'], config?: Config) =>
  async (dispatch: Dispatch<RemoveAddressAction>): Promise<void> => {
    dispatch({
      meta: { addressId },
      type: REMOVE_ADDRESS_REQUEST,
    });

    try {
      const result = await deleteAddress({ userId, id: addressId }, config);

      dispatch({
        meta: { addressId },
        type: REMOVE_ADDRESS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { addressId },
        payload: { error },
        type: REMOVE_ADDRESS_FAILURE,
      });

      throw error;
    }
  };

export default removeAddressFactory;