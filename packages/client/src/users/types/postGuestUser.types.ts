import type { Config } from '../../types';
import type { GuestUserResponse } from './guestUser.types';

export type PostGuestUserData = {
  countryCode: string;
  ip: string;
  externalId: string;
  friendId: string;
};

export type PostGuestUser = (
  data: PostGuestUserData,
  config?: Config,
) => Promise<GuestUserResponse>;
