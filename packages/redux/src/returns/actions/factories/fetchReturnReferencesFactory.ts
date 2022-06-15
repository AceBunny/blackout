import {
  FETCH_RETURN_REFERENCES_FAILURE,
  FETCH_RETURN_REFERENCES_REQUEST,
  FETCH_RETURN_REFERENCES_SUCCESS,
} from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Dispatch } from 'redux';
import type {
  GetReturnReferences,
  Query,
} from '@farfetch/blackout-client/src/returns/types';

/**
 * Method responsible for obtaining a specific return reference.
 *
 * @param getReferences - Get references client.
 *
 * @returns Thunk factory.
 */
const fetchReturnReferencesFactory =
  (getReturnReferences: GetReturnReferences) =>
  (id: string, name: string, query?: Query, config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<string> => {
    dispatch({
      type: FETCH_RETURN_REFERENCES_REQUEST,
    });

    try {
      const result = await getReturnReferences(id, name, query, config);

      dispatch({
        type: FETCH_RETURN_REFERENCES_SUCCESS,
      });
      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: FETCH_RETURN_REFERENCES_FAILURE,
      });

      throw error;
    }
  };

export default fetchReturnReferencesFactory;