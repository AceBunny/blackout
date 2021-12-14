import {
  mockBrandId,
  mockMerchantId,
  mockProductId,
  mockSetId,
  mockSizeScaleId,
} from './ids.fixtures';
import { mockProductAttributes } from './productAttributes.fixtures';
import { mockProductColorGrouping } from './productColorGrouping.fixtures';
import { mockProductFittings } from './productFittings.fixtures';
import { mockProductSizeGuides } from './productSizeGuides.fixtures';
import { mockProductSizesAdapted } from './productSizes.fixtures';
import { mockProductVariants } from './productVariantsByMerchantsLocations.fixtures';
import { mockProductVariantsMeasurements } from './productVariantsMeasurements.fixtures';

export const mockPriceAdapted = {
  includingTaxes: 129.7446,
  includingTaxesWithoutDiscount: 129.7446,
};

export const mockPriceResponse = {
  priceExclTaxes: 500,
  priceInclTaxes: 610,
  priceInclTaxesWithoutDiscount: 610,
  discountExclTaxes: 0,
  discountInclTaxes: 0,
  discountRate: 0,
  taxesRate: 22,
  taxesValue: 110,
  tags: ['VAT'],
  formattedPrice: '610,00 €',
  formattedPriceWithoutDiscount: '610,00 €',
  formattedPriceWithoutCurrency: '610,00',
  formattedPriceWithoutDiscountAndCurrency: '610,00',
  taxType: 'VAT',
};

export const mockTag = { name: 'NewSeason', id: 1 };

export const mockPromotions = [
  {
    id: '1234-5678-9fa01',
    name: 'Mock Promotion',
  },
];

export const mockLabels = [
  { id: 1502, name: 'Label 2', priority: 2 },
  { id: 1503, name: 'Label 3', priority: 3 },
  { id: 1501, name: 'Label 1', priority: 1 },
];

export const mockSortedLabels = [
  { id: 1501, name: 'Label 1', priority: 1 },
  { id: 1502, name: 'Label 2', priority: 2 },
  { id: 1503, name: 'Label 3', priority: 3 },
];

export const mockSizeScale = {
  sizeScaleId: mockSizeScaleId,
  description: 'Jeans (waist)',
  abbreviation: 'Waist',
  maps: [
    { description: '22', position: 17 },
    { description: '23', position: 18 },
    { description: '24', position: 19 },
    { description: '25', position: 20 },
    { description: '26', position: 21 },
    { description: '27', position: 22 },
    { description: '28', position: 23 },
    { description: '29', position: 24 },
    { description: '30', position: 25 },
    { description: '31', position: 26 },
    { description: '32', position: 27 },
    { description: '33', position: 28 },
    { description: '34', position: 29 },
    { description: '35', position: 30 },
    { description: '36', position: 31 },
    { description: '37', position: 32 },
    { description: '38', position: 33 },
  ],
};

export const mockBreadCrumbs = [
  {
    text: 'Woman',
    slug: 'woman',
    link: 'shopping/woman',
  },
];

export const mockSet = {
  name: 'cool set',
  gender: 0,
  genderName: 'foo-bar',
  products: {
    entries: [
      {
        id: 12913172,
        shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
          },
        ],
        price: 129.7446,
        prices: [],
        slug: 'chuck-70-u-throat-ballet-sneakers-12913172',
        quantity: 7,
      },
    ],
    number: 1,
    totalItems: 40,
    totalPages: 2,
  },
  facetGroups: [
    {
      deep: 3,
      description: 'Categories',
      type: 6,
      values: [
        [
          {
            value: 136103,
            description: 'A-Line Skirts',
            slug: 'skirts-a-line-skirts',
            url: 'woman/skirts-a-line-skirts',
          },
        ],
      ],
      key: 'categories',
    },
  ],
};

export const mockProduct = {
  merchant: mockMerchantId,
  price: mockPriceAdapted,
  sizes: mockProductSizesAdapted,
  tag: mockTag,
  id: mockProductId,
  shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
  brand: mockBrandId,
  slug: 'chuck-70-u-throat-ballet-sneakers-12913174',
  quantity: 7,
  promotions: mockPromotions,
  labels: mockLabels,
  measurements: mockProductVariantsMeasurements,
  colorGrouping: mockProductColorGrouping,
  attributes: mockProductAttributes,
  variants: mockProductVariants,
  fittings: mockProductFittings,
  sizeGuides: mockProductSizeGuides,
  recommendedSet: mockSetId,
  relatedSets: [
    {
      setId: mockSetId,
      setType: 3,
    },
    {
      setId: 7861688,
      setType: 5,
    },
  ],
  scaleId: mockSizeScaleId,
  breadCrumbs: mockBreadCrumbs,
  isDuplicated: false,
  associationsInformation: {
    hasColorGrouping: true,
  },
};