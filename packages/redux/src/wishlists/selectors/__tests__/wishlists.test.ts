import * as fromEntities from '../../../entities/selectors/entity';
import * as fromWishlist from '../../reducer/wishlists';
import * as selectors from '..';
import {
  mockProductId,
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistNormalizedPayload,
  mockWishlistSetId,
  mockWishlistState,
} from 'tests/__fixtures__/wishlists';

describe('wishlists redux selectors', () => {
  const wishlistItemEntity =
    mockWishlistNormalizedPayload.entities.wishlistItems[mockWishlistItemId];
  const productEntity =
    mockWishlistNormalizedPayload.entities.products[mockProductId];

  beforeEach(jest.clearAllMocks);

  describe('getWishlistId()', () => {
    it('should get the wishlist id property from state', () => {
      const spy = jest.spyOn(fromWishlist, 'getId');

      expect(selectors.getWishlistId(mockWishlistState)).toEqual(
        mockWishlistId,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlist()', () => {
    it('should get the user wishlist from state', () => {
      const spy = jest.spyOn(fromWishlist, 'getResult');

      expect(selectors.getWishlist(mockWishlistState)).toEqual(
        mockWishlistState.wishlist.result,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistError()', () => {
    it('should get the wishlist error property from state', () => {
      const expectedResult = mockWishlistState.wishlist.error;
      const spy = jest.spyOn(fromWishlist, 'getError');

      expect(selectors.getWishlistError(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistLoading()', () => {
    it('should get the wishlist loading status from state', () => {
      const expectedResult = mockWishlistState.wishlist.isLoading;
      const spy = jest.spyOn(fromWishlist, 'getIsLoading');

      expect(selectors.isWishlistLoading(mockWishlistState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistItem()', () => {
    const expectedResult = {
      ...wishlistItemEntity,
      product: productEntity,
    };

    it('should return all data regarding a wishlist item', () => {
      const spy = jest.spyOn(fromEntities, 'getEntityById');

      expect(
        selectors.getWishlistItem(mockWishlistState, mockWishlistItemId),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(
        mockWishlistState,
        'wishlistItems',
        mockWishlistItemId,
      );
    });

    it('should return the wishlist item data with parent sets information', () => {
      const expectedResult = {
        ...mockWishlistState.entities.wishlistItems[mockWishlistItemId],
        parentSets: [
          {
            id: mockWishlistSetId,
            name: mockWishlistState.entities.wishlistSets[mockWishlistSetId]
              .name,
          },
        ],
        product: mockWishlistState.entities.products[mockProductId],
      };

      expect(
        selectors.getWishlistItem(mockWishlistState, mockWishlistItemId, true),
      ).toEqual(expectedResult);
    });
  });

  describe('getWishlistItemsIds()', () => {
    it("should return a list of wishlist item ID's from state", () => {
      const expectedResult = mockWishlistState.wishlist.items.ids;

      expect(selectors.getWishlistItemsIds(mockWishlistState)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getWishlistItems()', () => {
    it('should return the wishlist items content from state', () => {
      const expectedResult = [
        {
          ...mockWishlistState.entities.wishlistItems[mockWishlistItemId],
          product: mockWishlistState.entities.products[mockProductId],
        },
        {
          id: 102,
          product: { id: 1002, description: 'bar product' },
          quantity: 2,
        },
      ];

      expect(selectors.getWishlistItems(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return the wishlist items content with parent sets information from state', () => {
      const expectedResult = [
        {
          ...mockWishlistState.entities.wishlistItems[mockWishlistItemId],
          parentSets: [
            {
              id: mockWishlistSetId,
              name: mockWishlistState.entities.wishlistSets[mockWishlistSetId]
                .name,
            },
          ],
          product: mockWishlistState.entities.products[mockProductId],
        },
        {
          id: 102,
          parentSets: [],
          product: { id: 1002, description: 'bar product' },
          quantity: 2,
        },
      ];

      expect(selectors.getWishlistItems(mockWishlistState, true)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getWishlistItemsCounter()', () => {
    it('should return the wishlistItems counter when wishlistItems exists', () => {
      const expectedResult = 2;

      expect(selectors.getWishlistItemsCounter(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return 0 when does not exists wishlistItems', () => {
      const expectedResult = 0;
      const state = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          items: {
            ...mockWishlistState.wishlist.items,
            ids: [],
          },
        },
        entities: { wishlistItems: {} },
      };

      expect(selectors.getWishlistItemsCounter(state)).toEqual(expectedResult);
    });
  });

  describe('getWishlistTotalQuantity()', () => {
    it('should return the wishlistItems total quantity when wishlistItems exists', () => {
      const expectedResult = 4;

      expect(selectors.getWishlistTotalQuantity(mockWishlistState)).toEqual(
        expectedResult,
      );
    });

    it('should return 0 when does not exists wishlistItems', () => {
      const expectedResult = 0;
      const state = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          items: {
            ...mockWishlistState.wishlist.items,
            ids: [],
          },
        },
        entities: { wishlistItems: {} },
      };

      expect(selectors.getWishlistTotalQuantity(state)).toEqual(expectedResult);
    });
  });

  describe('findProductInWishlist()', () => {
    it('should return the wishlist item that already exists', () => {
      const expectedResult = {
        ...wishlistItemEntity,
        product: productEntity,
      };

      expect(
        selectors.findProductInWishlist(mockWishlistState, {
          product: productEntity,
          size: wishlistItemEntity.size,
        }),
      ).toEqual(expectedResult);
    });

    it('should return undefined if the product does not exist in the wishlist items', () => {
      const state = {
        ...mockWishlistState,
        wishlist: {
          ...mockWishlistState.wishlist,
          items: {
            ...mockWishlistState.wishlist.items,
            ids: [],
          },
        },
        entities: {
          wishlistItems: undefined,
          products: undefined,
        },
      };

      expect(
        selectors.findProductInWishlist(state, {
          product: productEntity,
        }),
      ).toBeUndefined();
    });
  });

  describe('isWishlistItemLoading()', () => {
    it('should get the wishlist item loading status', () => {
      const spy = jest.spyOn(fromWishlist, 'getAreItemsLoading');

      expect(
        selectors.isWishlistItemLoading(mockWishlistState, mockWishlistItemId),
      ).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getWishlistItemError()', () => {
    it('should get the wishlist item error', () => {
      const expectedResult =
        mockWishlistState.wishlist.items.item.error[mockWishlistItemId];
      const spy = jest.spyOn(fromWishlist, 'getItemsError');

      expect(
        selectors.getWishlistItemError(mockWishlistState, mockWishlistItemId),
      ).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isWishlistWithAnyError()', () => {
    it('should return true if there is a general wishlist error', () => {
      const mockStateWithGeneralError = {
        ...mockWishlistState,
        wishlist: {
          error: 'error: not loaded',
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {
                [mockWishlistItemId]: true,
              },
              error: {
                [mockWishlistItemId]: null,
              },
            },
          },
        },
      };

      expect(
        selectors.isWishlistWithAnyError(mockStateWithGeneralError),
      ).toEqual(true);
    });

    it('should return true if there is an error in a wishlist item', () => {
      const mockStatewithWishlistItemError = {
        ...mockWishlistState,
        wishlist: {
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {
                [mockWishlistItemId]: true,
              },
              error: {
                [mockWishlistItemId]: 'Oh no! Terrible error!',
              },
            },
          },
        },
      };

      expect(
        selectors.isWishlistWithAnyError(mockStatewithWishlistItemError),
      ).toEqual(true);
    });

    it('should return false if there are no errors', () => {
      const mockStateWithoutError = {
        ...mockWishlistState,
        wishlist: {
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [mockWishlistItemId],
            item: {
              isLoading: {
                [mockWishlistItemId]: true,
              },
              error: {
                [mockWishlistItemId]: null,
              },
            },
          },
        },
      };
      expect(selectors.isWishlistWithAnyError(mockStateWithoutError)).toEqual(
        false,
      );
    });

    it('should return false if the wishlist items are an empty array', () => {
      const mockStateWithoutWishlistItems = {
        ...mockWishlistState,
        wishlist: {
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            ids: [],
            item: {
              isLoading: {},
              error: {},
            },
          },
        },
      };
      expect(
        selectors.isWishlistWithAnyError(mockStateWithoutWishlistItems),
      ).toEqual(false);
    });

    it('should return false if does not exist wishlist items', () => {
      const mockStateWithoutWishlistItems = {
        ...mockWishlistState,
        wishlist: {
          error: null,
          id: mockWishlistId,
          isLoading: false,
          items: {
            item: {
              isLoading: {},
              error: {},
            },
          },
        },
      };
      expect(
        selectors.isWishlistWithAnyError(mockStateWithoutWishlistItems),
      ).toEqual(false);
    });
  });

  describe('isProductInWishlist()', () => {
    it('should return true if there is a product with the same product id', () => {
      expect(
        selectors.isProductInWishlist(mockWishlistState, mockProductId),
      ).toBe(true);
    });

    it('should return false if found nothing', () => {
      const randomProductId = 958675864;

      expect(
        selectors.isProductInWishlist(mockWishlistState, randomProductId),
      ).toBe(false);
    });
  });

  describe('getWishlistItemsByProductId()', () => {
    it('should return items with the same product id', () => {
      const mockState = {
        wishlist: {
          ...mockWishlistState.wishlist,
          items: {
            ...mockWishlistState.wishlist.items,
            ids: [mockWishlistItemId, 102, 103],
          },
        },
        entities: {
          ...mockWishlistState.entities,
          wishlistItems: {
            ...mockWishlistState.entities.wishlistItems,
            103: {
              product: mockProductId,
            },
          },
        },
      };

      expect(
        selectors.getWishlistItemsByProductId(mockState, mockProductId),
      ).toHaveLength(2);
    });

    it('should return false if found nothing', () => {
      const randomProductId = 958675864;

      expect(
        selectors.getWishlistItemsByProductId(
          mockWishlistState,
          randomProductId,
        ),
      ).toHaveLength(0);
    });
  });
});