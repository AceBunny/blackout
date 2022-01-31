import {
  FETCH_PRODUCT_SIZEGUIDES_FAILURE,
  FETCH_PRODUCT_SIZEGUIDES_REQUEST,
  FETCH_PRODUCT_SIZEGUIDES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type {
  GetProductSizeGuides,
  Product,
  ProductSizeGuide,
} from '@farfetch/blackout-client/products/types';

/**
 * @callback FetchProductSizeGuidesThunkFactory
 *
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * size guides for a given product id.
 * This size guides logic should be used where the project has a category tree.
 * If your project does not have a category tree you
 * should use the size guides logic from @farfetch/blackout-redux/sizeGuides.
 *
 * @memberof module:products/actions/factories
 *
 * @param {Function} getProductSizeGuides - Get product size guides client.
 *
 * @returns {FetchProductSizeGuidesThunkFactory} Thunk factory.
 */
const fetchProductSizeGuidesFactory =
  (getProductSizeGuides: GetProductSizeGuides) =>
  (productId: Product['result']['id'], config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<ProductSizeGuide[]> => {
    dispatch({
      meta: { productId },
      type: FETCH_PRODUCT_SIZEGUIDES_REQUEST,
    });

    try {
      const result = await getProductSizeGuides(productId, config);

      const productWithSizeGuide = {
        id: productId,
        sizeGuides: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithSizeGuide, productSchema),
        type: FETCH_PRODUCT_SIZEGUIDES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: FETCH_PRODUCT_SIZEGUIDES_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductSizeGuidesFactory;