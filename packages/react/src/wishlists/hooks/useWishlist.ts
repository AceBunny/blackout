/**
 * Hook to provide all kinds of data for the business logic attached to the
 * wishlists.
 */
import {
  addWishlistItem,
  fetchWishlist,
  getUser,
  getWishlist,
  getWishlistError,
  getWishlistItems,
  isWishlistLoading,
  removeWishlistItem,
  resetWishlist,
  updateWishlistItem,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// Types
import type {
  AddItem,
  FetchWishlist,
  RemoveItem,
  ResetWishlist,
  UpdateItem,
  UseWishlistOptions,
} from './types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * wishlist business logic.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any wishlist operation.
 */
const useWishlist = (options: UseWishlistOptions = {}) => {
  const { enableAutoFetch = false } = options;
  // Selectors
  const error = useSelector(getWishlistError);
  const isLoading = useSelector(isWishlistLoading);
  const items = useSelector(getWishlistItems);
  const wishlist = useSelector(getWishlist);
  const userWishlistId = useSelector(getUser)?.wishlistId;
  // Actions
  const addItem: AddItem = useAction(addWishlistItem);
  const updateItem: UpdateItem = useAction(updateWishlistItem);
  const removeItem: RemoveItem = useAction(removeWishlistItem);
  const fetch: FetchWishlist = useAction(fetchWishlist);
  const reset: ResetWishlist = useAction(resetWishlist);
  // Data with some logic
  const count = wishlist.count;
  const isEmpty = count === 0;
  const isFetched = !!wishlist.id && typeof count !== 'undefined' && count >= 0;

  useEffect(() => {
    if (!isLoading && !error && enableAutoFetch && userWishlistId) {
      fetch(userWishlistId);
    }
  }, [enableAutoFetch, error, fetch, isLoading, userWishlistId]);

  return {
    isLoading,
    error,
    isFetched,
    actions: {
      fetch,
      reset,
      addItem,
      updateItem,
      removeItem,
    },
    data: {
      ...wishlist,
      count,
      isEmpty,
      items,
    },
  };
};

export default useWishlist;
