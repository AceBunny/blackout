import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { Config } from '@farfetch/blackout-client/types';
import type { DeleteUserContact } from '@farfetch/blackout-client/users/contacts/types';
import type { Dispatch } from 'redux';

/**
 * Remove a user contact.
 *
 * @param deleteContact - Delete contact client.
 *
 * @returns Thunk factory.
 */

const removeContactFactory =
  (deleteContact: DeleteUserContact) =>
  (id: number, contactId: string, config?: Config) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: actionTypes.REMOVE_CONTACT_REQUEST,
      });

      const result = await deleteContact(id, contactId, config);

      dispatch({
        type: actionTypes.REMOVE_CONTACT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.REMOVE_CONTACT_FAILURE,
      });

      throw error;
    }
  };

export default removeContactFactory;
