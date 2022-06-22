import { fetchRecentlyViewedProductsFactory } from './factories';
import { getRecentlyViewedProducts } from '@farfetch/blackout-client';

/**
 * Method responsible for retrieving a list of recently viewed product IDs.
 */
export const fetchRecentlyViewedProducts = fetchRecentlyViewedProductsFactory(
  getRecentlyViewedProducts,
);