import { fetchBagFactory } from './factories';
import { getBag } from '@farfetch/blackout-client/bags';

/**
 * Fetches the bag.
 *
 * @memberof module:bags/actions
 *
 * @name fetchBag
 *
 * @type {FetchBagThunkFactory}
 */

export default fetchBagFactory(getBag);