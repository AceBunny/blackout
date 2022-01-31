import type { Config } from '../../types';
import type { UserAttributesQuery } from './query.types';
import type { UserAttributesResponse } from './userAttributesResponse.types';

export type GetUserAttributes = (
  id: number,
  query?: UserAttributesQuery,
  config?: Config,
) => Promise<UserAttributesResponse>;