import client, { adaptError } from '../helpers/client';
import type { GetPrograms } from './types';

/**
 * Method responsible for loading the programs.
 *
 * @function getPrograms
 * @memberof module:loyalty/client
 *
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getPrograms: GetPrograms = config =>
  client
    .get('/loyalty/v1/programs', config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getPrograms;