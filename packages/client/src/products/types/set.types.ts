import type { BreadCrumb } from './breadCrumb.types';
import type { FacetGroup } from './facetGroup.types';
import type { FilterSegment } from './filterSegment.types';
import type { GenderEnum } from '../../types';
import type { ProductSummary } from './productSummary.types';
import type { ShoppingConfig } from './shoppingConfig.types';

export type Set = {
  name: string;
  products: {
    entries: ProductSummary[];
    number: number;
    totalItems: number;
    totalPages: number;
  };
  facetGroups: FacetGroup[];
  filterSegments: FilterSegment[];
  config: ShoppingConfig;
  breadCrumbs: BreadCrumb[];
  searchTerm: string;
  facetsBaseUrl: string;
  _sorts: string[];
  _clearUrl: string;
  _isClearHidden: boolean;
  gender: GenderEnum;
  genderName: string;
};