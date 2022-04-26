import {
  FETCH_GUEST_USER_FAILURE,
  FETCH_GUEST_USER_REQUEST,
  FETCH_GUEST_USER_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type { GetGuestUser } from '@farfetch/blackout-client/users/types';

/**
 * @callback FetchGuestUserThunkFactory
 * @param {string} id - Universal identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch the guest user details with the specified id.
 *
 * @function fetchGuestUser
 * @memberof module:users/actions
 *
 * @param {Function} getGuestUser - Get guest user client.
 *
 * @returns {FetchGuestUserThunkFactory} Thunk factory.
 */

const fetchGuestUserFactory =
  (getGuestUser: GetGuestUser) =>
  (id: number, config?: Config) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_GUEST_USER_REQUEST,
    });

    try {
      const result = await getGuestUser(id, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      dispatch({
        payload: userEntity,
        type: FETCH_GUEST_USER_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_GUEST_USER_FAILURE,
      });

      throw error;
    }
  };

export default fetchGuestUserFactory;