import {
  FETCH_CHARGES_FAILURE,
  FETCH_CHARGES_REQUEST,
  FETCH_CHARGES_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetCheckoutOrderCharge,
  GetCheckoutOrderChargeResponse,
} from '@farfetch/blackout-client/checkout/types';

/**
 * @param id       - Numeric identifier of the checkout order.
 * @param chargeId - Alphanumeric guid of the charge.
 * @param config   - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for getting the order charge.
 *
 * @param getCheckoutOrderCharge - Get charges client.
 *
 * @returns Thunk factory.
 */
const fetchChargeFactory =
  (getCheckoutOrderCharge: GetCheckoutOrderCharge) =>
  (id: string, chargeId: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<GetCheckoutOrderChargeResponse> => {
    try {
      dispatch({
        type: FETCH_CHARGES_REQUEST,
      });

      const result = await getCheckoutOrderCharge(id, chargeId, config);

      dispatch({
        payload: result,
        type: FETCH_CHARGES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_CHARGES_FAILURE,
      });

      throw error;
    }
  };

export default fetchChargeFactory;