import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';
import type { Config } from '@farfetch/blackout-client/types';
import type {
  Country,
  GetCountry,
} from '@farfetch/blackout-client/locale/types';
import type { Dispatch } from 'redux';

/**
 * @callback FetchCountryThunkFactory
 *
 * @memberof module:locale/actions/factories
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2).
 * @param {Object} [config] - Custom configurations to send to the client
 * instance.
 *
 * @returns {FetchCountryThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch a specific country, by its country code.
 *
 * @memberof module:locale/actions/factories
 *
 * @param {Function} getCountry - Get country client.
 *
 * @returns {FetchCountryThunkFactory} Thunk factory.
 */
const fetchCountryFactory =
  (getCountry: GetCountry) =>
  (countryCode: string, config?: Config) =>
  async (dispatch: Dispatch): Promise<Country> => {
    dispatch({
      meta: { countryCode },
      type: actionTypes.FETCH_COUNTRY_REQUEST,
    });

    try {
      const result = await getCountry(countryCode, config);

      dispatch({
        meta: { countryCode },
        payload: {
          ...normalize(result, country),
        },
        type: actionTypes.FETCH_COUNTRY_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { countryCode },
        payload: { error },
        type: actionTypes.FETCH_COUNTRY_FAILURE,
      });

      throw error;
    }
  };

export default fetchCountryFactory;