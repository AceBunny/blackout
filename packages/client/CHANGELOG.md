# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-next.106](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.105...@farfetch/blackout-client@2.0.0-next.106) (2021-12-14)


### Features

* **client|redux:** remove getGuestOrderDetails from next ([36a9660](https://github.com/Farfetch/blackout/commit/36a96606e66190c96114ed0e1741d8a1af462a2b))





# [2.0.0-next.105](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.104...@farfetch/blackout-client@2.0.0-next.105) (2021-12-09)


### Features

* **client|redux:** loyalty - split client ([6d36e03](https://github.com/Farfetch/blackout/commit/6d36e035865916cdf5aa5b6e5341f9ca3963d632))





# [2.0.0-next.104](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.103...@farfetch/blackout-client@2.0.0-next.104) (2021-12-07)


### Bug Fixes

* **core|react:** handle guest users expired in authentication provider ([447ed49](https://github.com/Farfetch/blackout/commit/447ed4962b696bf992052424e94f2a211ebc06d9))





# [2.0.0-next.103](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.102...@farfetch/blackout-client@2.0.0-next.103) (2021-12-06)

**Note:** Version bump only for package @farfetch/blackout-client





# [2.0.0-next.102](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.101...@farfetch/blackout-client@2.0.0-next.102) (2021-12-06)


### Features

* **client|redux:** profile - rename API and  client split ([1d74770](https://github.com/Farfetch/blackout/commit/1d7477014b32ef47bc982386e99f8b200cee1a2c))





# [2.0.0-next.101](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.100...@farfetch/blackout-client@2.0.0-next.101) (2021-12-02)


### Features

* **client:** change nomenclature and improve orders actions ([312ca96](https://github.com/Farfetch/blackout/commit/312ca9671ff194894105e758be9d0b4a3f013357))


### BREAKING CHANGES

* **client:** - Rename the action types if you use them in any custom reducer/middleware:

```js
import { actionTypes } from "@farfetch/blackout-client/orders/redux";

// Previously
actionTypes.GET_ORDER_DETAILS_FAILURE;
actionTypes.GET_ORDER_DETAILS_REQUEST;
actionTypes.GET_ORDER_DETAILS_SUCCESS;

actionTypes.GET_ORDER_RETURN_OPTIONS_FAILURE;
actionTypes.GET_ORDER_RETURN_OPTIONS_REQUEST;
actionTypes.GET_ORDER_RETURN_OPTIONS_SUCCESS;

actionTypes.GET_ORDERS_FAILURE;
actionTypes.GET_ORDERS_REQUEST;
actionTypes.GET_ORDERS_SUCCESS;

actionTypes.GET_TRACKINGS_FAILURE;
actionTypes.GET_TRACKINGS_REQUEST;
actionTypes.GET_TRACKINGS_SUCCESS;

actionTypes.GET_ORDER_DOCUMENTS_FAILURE;
actionTypes.GET_ORDER_DOCUMENTS_REQUEST;
actionTypes.GET_ORDER_DOCUMENTS_SUCCESS;

actionTypes.GET_ORDER_DOCUMENT_FAILURE;
actionTypes.GET_ORDER_DOCUMENT_REQUEST;
actionTypes.GET_ORDER_DOCUMENT_SUCCESS;

actionTypes.POST_ORDER_DOCUMENT_FAILURE;
actionTypes.POST_ORDER_DOCUMENT_REQUEST;
actionTypes.POST_ORDER_DOCUMENT_SUCCESS;

// Change to
actionTypes.FETCH_ORDER_DETAILS_FAILURE;
actionTypes.FETCH_ORDER_DETAILS_REQUEST;
actionTypes.FETCH_ORDER_DETAILS_SUCCESS;

actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE;
actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST;
actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS;

actionTypes.FETCH_ORDERS_FAILURE;
actionTypes.FETCH_ORDERS_REQUEST;
actionTypes.FETCH_ORDERS_SUCCESS;

actionTypes.FETCH_TRACKINGS_FAILURE;
actionTypes.FETCH_TRACKINGS_REQUEST;
actionTypes.FETCH_TRACKINGS_SUCCESS;

actionTypes.FETCH_ORDER_DOCUMENTS_FAILURE;
actionTypes.FETCH_ORDER_DOCUMENTS_REQUEST;
actionTypes.FETCH_ORDER_DOCUMENTS_SUCCESS;

actionTypes.FETCH_ORDER_DOCUMENT_FAILURE;
actionTypes.FETCH_ORDER_DOCUMENT_REQUEST;
actionTypes.FETCH_ORDER_DOCUMENT_SUCCESS;

actionTypes.ADD_ORDER_DOCUMENT_FAILURE;
actionTypes.ADD_ORDER_DOCUMENT_REQUEST;
actionTypes.ADD_ORDER_DOCUMENT_SUCCESS;
```

- Rename the action thunk creators:

```js
// Previously
import {
  doPostOrderDocument,
  doGetOrderDetails,
  doGetOrderDetailsGuestUser,
  doGetOrderDocument,
  doGetOrderDocuments,
  doGetOrderReturnOptions,
  doGetOrders,
  doGetTracking,
  doResetOrders,
} from "@farfetch/blackout-core/orders/redux";

// Change to
import {
  addOrderDocument,
  fetchOrderDetails,
  fetchOrderDetailsGuestUser,
  fetchOrderDocument,
  fetchOrderDocuments,
  fetchOrderReturnOptions,
  fetchOrders,
  fetchTrackings,
  resetOrders,
} from "@farfetch/blackout-client/orders/redux";
```





# [2.0.0-next.100](https://github.com/Farfetch/blackout/compare/@farfetch/blackout-client@2.0.0-next.99...@farfetch/blackout-client@2.0.0-next.100) (2021-11-29)

**Note:** Version bump only for package @farfetch/blackout-client





# 2.0.0-next.99 (2021-11-29)


### Features

* migrate packages ([d081242](https://github.com/Farfetch/blackout/commit/d08124231d14ccd165e047935fbcfbe9f212d352))