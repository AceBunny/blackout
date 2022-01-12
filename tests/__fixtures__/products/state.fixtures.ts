import { mockMerchantId, mockProductId } from './ids.fixtures';
import { mockProduct } from './products.fixtures';
import {
  mockProductsListHash,
  mockProductsListNormalizedPayload,
} from './productsLists.fixtures';
import { mockRecommendedSetState } from './recommendedSet.fixtures';

export const mockAttributesState = {
  attributes: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: 'Error',
    },
  },
};
export const mockColorGroupingState = {
  colorGrouping: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: 'Error',
    },
    currentPageIndex: {
      [mockProductId]: 4,
    },
  },
};
export const mockDetailsState = {
  details: {
    error: {
      [mockProductId]: 'Error - Not loaded.',
      456: null,
    },
    isHydrated: {
      [mockProductId]: false,
      456: false,
    },
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
  },
};
export const mockFittingsState = {
  fittings: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: 'Error',
    },
  },
};
export const mockProductsListsState = {
  lists: {
    error: { [mockProductsListHash]: 'Error - Listing not loaded.' },
    isHydrated: {
      [mockProductsListHash]: true,
    },
    isLoading: { [mockProductsListHash]: false },
    hash: mockProductsListHash,
  },
};
export const mockMeasurementsState = {
  measurements: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: 'Error',
    },
  },
};
export const mockVariantsByMerchantsLocationsState = {
  variantsByMerchantsLocations: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: 'Error',
    },
  },
};
export const mockSizeGuidesState = {
  sizeGuides: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: 'Error',
    },
  },
};
export const mockSizesState = {
  sizes: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: 'Error',
    },
  },
};
export const mockProductsState = {
  products: {
    ...mockAttributesState,
    ...mockColorGroupingState,
    ...mockDetailsState,
    ...mockFittingsState,
    ...mockMeasurementsState,
    ...mockProductsListsState,
    ...mockRecommendedSetState,
    ...mockSizeGuidesState,
    ...mockSizesState,
    ...mockVariantsByMerchantsLocationsState,
  },
  bag: {
    id: 1,
    items: {
      ids: [101, 102, 103],
    },
  },
  entities: {
    ...mockProductsListNormalizedPayload.entities,
    bagItems: {
      101: {
        id: 101,
        quantity: 1,
        product: mockProductId,
        merchant: mockMerchantId,
        size: {
          id: 1,
          scale: 117,
          name: '37',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 10,
        },
      },
      102: {
        id: 102,
        quantity: 1,
        product: mockProductId,
        merchant: mockMerchantId,
        size: {
          scale: 117,
          id: 6,
          name: '41',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 44,
        },
      },
      103: {
        id: 103,
        quantity: 1,
        product: mockProductId,
        merchant: 788,
        size: {
          scale: 117,
          id: 1,
          name: '37',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 10,
        },
      },
    },
    products: {
      ...mockProductsListNormalizedPayload.entities.products,
      [mockProductId]: mockProduct,
    },
  },
};