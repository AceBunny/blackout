import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetReturnPickupRescheduleRequests,
  PickupRescheduleRequests,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * Obtains the pickup reschedule requests.
 *
 * @param getPickupRescheduleRequests - Get pickup reschedule requests client.
 *
 * @returns Thunk factory.
 */
const fetchReturnPickupRescheduleRequestsFactory =
  (getReturnPickupRescheduleRequests: GetReturnPickupRescheduleRequests) =>
  (id: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<PickupRescheduleRequests> => {
    dispatch({
      type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_REQUEST,
    });

    try {
      const result = await getReturnPickupRescheduleRequests(id, config);

      dispatch({
        payload: result,
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.FETCH_RETURN_PICKUP_RESCHEDULE_REQUESTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnPickupRescheduleRequestsFactory;