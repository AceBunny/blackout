import { buildContentGroupHash } from '../utils';
import { INITIAL_STATE } from './reducer';
import { normalize } from 'normalizr';
import contentGroup from '../../entities/schemas/contentGroup';
import get from 'lodash/get';
import merge from 'lodash/merge';

/**
 * Converts server data from searchContentRequests to store state.
 *
 * @function serverInitialState
 *
 * @param {object} page - Params from the `page` object injected by the server.
 * @param {object} page.model - Page model.
 *
 * @returns {object} Initial state for the contents reducer.
 */
export default ({ model }) => {
  if (!get(model, 'searchContentRequests')) {
    return { contents: INITIAL_STATE };
  }

  const { searchContentRequests, slug, subfolder } = model;

  return searchContentRequests.reduce((acc, item) => {
    const {
      filters: { codes, contentTypeCode },
      searchResponse,
    } = item;
    let hashCommerce = null;
    if (contentTypeCode === 'commerce_pages') {
      const slugCommerce = slug
        .replace(subfolder, '')
        .replace('&json=true', '')
        .replace('?json=true', '');
      hashCommerce = `${contentTypeCode}!${slugCommerce}`;
    }
    const hash =
      hashCommerce ?? buildContentGroupHash({ codes, contentTypeCode });
    const { entities } = {
      ...normalize({ hash, ...searchResponse }, contentGroup),
    };

    return merge(acc, {
      entities,
      contents: {
        isLoading: {
          [hash]: false,
        },
        error: {},
      },
    });
  }, {});
};
