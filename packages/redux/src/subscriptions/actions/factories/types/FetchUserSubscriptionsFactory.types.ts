import type { Dispatch } from 'redux';
import type { FetchUserSubscriptionsAction } from '../../../types';
import type { GetSubscriptions } from '@farfetch/blackout-client/subscriptions/types';

export type FetchUserSubscriptionsFactory<T extends GetSubscriptions> = (
  getSubscriptions: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<FetchUserSubscriptionsAction>) => ReturnType<T>;