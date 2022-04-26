import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from '../../actionTypes';
import type { Config } from '@farfetch/blackout-client/types';
import type { Dispatch } from 'redux';
import type {
  GetUser,
  GetUserData,
} from '@farfetch/blackout-client/users/types';

/**
 * @callback FetchUserThunkFactory
 * @param {(Array | string)} params - Possibilites are: `bag`, `membership`,
 * `wishlist`.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch the user data.
 *
 * @function fetchUser
 * @memberof module:users/actions
 *
 * @param {Function} getUser - Get user client.
 *
 * @returns {FetchUserThunkFactory} Thunk factory.
 */
const fetchUserFactory =
  (getUser: GetUser) =>
  (data: GetUserData, config?: Config) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_USER_REQUEST,
    });

    try {
      const result = await getUser(data, config);
      const userEntity = {
        entities: { user: result },
        result: result.id,
      };

      dispatch({
        payload: userEntity,
        type: FETCH_USER_SUCCESS,
        meta: config,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: FETCH_USER_FAILURE,
      });

      throw error;
    }
  };

export default fetchUserFactory;