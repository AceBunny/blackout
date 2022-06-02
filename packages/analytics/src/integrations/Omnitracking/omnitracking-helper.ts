import {
  CLIENT_LANGUAGES_LIST,
  DEFAULT_CLIENT_LANGUAGE,
  DEFAULT_SEARCH_QUERY_PARAMETERS,
} from './constants';
import { isPageEventType, isScreenEventType } from '../../utils/typePredicates';
import {
  pageActionEventTypes,
  pageDefinitions,
  pageEventsFilter,
  pageViewEventTypes,
  systemActionParameters,
  trackDefinitions,
} from './definitions';
import { v4 as uuidV4 } from 'uuid';
import get from 'lodash/get';
import pick from 'lodash/pick';
import platformTypes from '../../types/platformTypes';
import type { EventContext, EventData, TrackTypesValues } from '../..';
import type {
  OmnitrackingCommonEventParameters,
  OmnitrackingPageEventParameters,
  OmnitrackingRequestPayload,
  OmnitrackingTrackEventParameters,
  PageActionEvents,
  PageViewEvents,
  SearchQueryParameters,
  SpecificParametersBuilderByPlatform,
  SpecificParametersForEventType,
  ValParameter,
} from './types/Omnitracking.types';

/**
 * Adds common parameters to all kinds of message types.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Object containing common parameters.
 */
export const getCommonParameters = (
  data: EventData<TrackTypesValues>,
): OmnitrackingCommonEventParameters => {
  const parameters: OmnitrackingCommonEventParameters = {
    clientTimestamp: new Date(data.timestamp).toJSON(),
    uuid: uuidV4(),
  };

  return parameters;
};

/**
 * Returns the unique view id for the event. If the event properties pass it,
 * return that value. Else, return a newly generated uuid.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns The unique view id for the event.
 */
export const getUniqueViewIdParameter = (
  data: EventData<TrackTypesValues>,
): string => {
  const uniqueViewId = get(data, 'properties.uniqueViewId');

  return typeof uniqueViewId === 'string' ? uniqueViewId : uuidV4();
};

/**
 * Returns the customer id for tracking of the passed user instance.
 *
 * @param user - The user instance.
 *
 * @returns The formatted customer ID.
 */
export const getCustomerIdFromUser = (
  user: EventData<TrackTypesValues>['user'],
): string => {
  const customerId = user.id;
  const isGuest = user.traits?.isGuest;

  return customerId && isGuest ? `g_${customerId}` : `${customerId}`;
};

/**
 * This method tries to match the name passed by `analytics.page(name)` with the
 * `pageEventsFilter` keywords.
 *
 * @param pageType - Page type passed to analytics.
 *
 * @returns The event for the page type.
 */
export const getPageEventFromPageType = (
  pageType: EventData<TrackTypesValues>['event'],
): PageViewEvents | null => {
  let event: PageViewEvents | null = null;

  (
    Object.keys(pageEventsFilter) as Array<keyof typeof pageEventsFilter>
  ).forEach(key => {
    if (pageEventsFilter[key].indexOf(pageType) >= 0) {
      event = key;
    }
  });

  return event;
};

/**
 * This method tries to match some keyword from `eventMapper` with any word on the
 * `location.href`.
 *
 * @param location - Location object to check if there is any keyword that matches the `eventMapper`.
 *
 * @returns The event for the page.
 */
export const getPageEventFromLocation = (
  location?: Location,
): PageViewEvents | null => {
  if (!location || !location.href) {
    return null;
  }

  let event = null;

  (
    Object.keys(pageEventsFilter) as Array<keyof typeof pageEventsFilter>
  ).forEach(key => {
    pageEventsFilter[key].forEach(keyword => {
      if (
        location.href.toLowerCase().indexOf(keyword.toLocaleLowerCase()) >= 0
      ) {
        event = key;
      }
    });
  });

  return event;
};

/**
 * Returns the correct event according the page the user is in.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Name of the event.
 */
export const getPageEvent = (
  data: EventData<TrackTypesValues>,
): PageViewEvents => {
  const location = get(data, 'context.web.window.location', {});
  const event =
    getPageEventFromPageType(data.event) || getPageEventFromLocation(location);

  return event || pageViewEventTypes.GenericPageVisited;
};

/**
 * Creates an object with specific parameters for a web app.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Filtered object.
 */
function getSpecificWebParameters(
  data: EventData<TrackTypesValues>,
): SpecificParametersForEventType<typeof data> {
  let commonParameters: SpecificParametersForEventType<typeof data> =
    {} as SpecificParametersForEventType<typeof data>;

  if (isPageEventType(data)) {
    const referrer = get(data, 'context.web.document.referrer', '');
    const location = get(data, 'context.web.window.location', {});
    const query = get(location, 'query', {});
    const internalRequest =
      referrer.indexOf(`${location.protocol}//${location.host}`) === 0;

    const url = get(data, 'context.web.window.location.pathname').split('/');
    const subfolder = url[1].split('-');
    const userCountryLocation = (
      subfolder[1] ? subfolder[1] : subfolder[0]
    ).toLowerCase();

    commonParameters = {
      referrer,
      internalRequest,
      url: location.href,
      userAgent: get(data, 'context.web.window.navigator.userAgent'),
      referrerHost: referrer.split('/')[2],
      screenWidth: get(data, 'context.web.window.screen.width'),
      screenHeight: get(data, 'context.web.window.screen.height'),
      deviceLanguage: get(data, 'context.web.window.navigator.language'),
      userCountryLocation,
      utmTerm: query.utm_term,
      utmSource: query.utm_source,
      utmMedium: query.utm_medium,
      utmContent: query.utm_content,
      utmCampaign: query.utm_campaign,
    } as SpecificParametersForEventType<typeof data>;
  }

  return commonParameters;
}

/**
 * Creates an object with specific parameters for a native app.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Filtered object.
 */
function getSpecificMobileParameters(
  data: EventData<TrackTypesValues>,
): SpecificParametersForEventType<typeof data> {
  const commonParameters: SpecificParametersForEventType<typeof data> =
    {} as SpecificParametersForEventType<typeof data>;

  if (isScreenEventType(data)) {
    const screenParameters = commonParameters as SpecificParametersForEventType<
      typeof data
    >;
    // Referrer must be sent with an empty string when we don't have a value for it.
    const referrer = get(data, 'context.app.referrer', '');
    screenParameters.referrer = referrer;
  }

  return commonParameters;
}

/**
 * Defines the common parameters builder by platform.
 */
const specificParametersBuilderByPlatform: SpecificParametersBuilderByPlatform =
  {
    [platformTypes.Web]: getSpecificWebParameters,
    [platformTypes.Mobile]: getSpecificMobileParameters,
  } as const;

/**
 * Creates an object with parameters that are specific to a platform. These
 * parameters are collected and inferred by analytics `data` object, so there's no
 * need to pass these properties via `analytics.page()` or `analytics.track()`.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns Filtered object.
 */
export const getPlatformSpecificParameters = (
  data: EventData<TrackTypesValues>,
): SpecificParametersForEventType<typeof data> => {
  const platform = get(data, 'platform', platformTypes.Web);

  const specificPlatformParametersBuilder =
    specificParametersBuilderByPlatform[
      platform as typeof platformTypes[keyof typeof platformTypes]
    ];

  if (!specificPlatformParametersBuilder) {
    return {};
  }

  return specificPlatformParametersBuilder(data);
};

/**
 * Filters the properties object with the `parameters` dictionary, so we don't pass
 * unnecessary information for the event. We search for parameters in many
 * locations: context -\> device -\> app -\> event -\> properties Each location can
 * override the values of the previous one.
 *
 * @param data  - Event data passed by analytics.
 * @param event - Event name to filter properties by.
 *
 * @returns Result of the `pick()` method.
 */
export const pickPageParameters = (
  data: EventData<TrackTypesValues>,
  event: PageViewEvents,
): OmnitrackingPageEventParameters => {
  const eventPageDefinitions = pageDefinitions[event];

  return {
    ...pick(data.context, eventPageDefinitions),
    ...pick(data.context.app, eventPageDefinitions),
    ...pick(data.context.event, eventPageDefinitions),
    ...pick(data.properties, eventPageDefinitions),
  };
};

/**
 * Formats page data to be sent to omnitracking service to register a page view.
 * Merges common parameters with the filtered ones sent via `analytics.page()`,
 * along some other properties.
 *
 * @param data                 - Event data passed by analytics.
 * @param additionalParameters - Additional parameters to be considered.
 *
 * @returns Formatted data.
 */
export const formatPageEvent = (
  data: EventData<TrackTypesValues>,
  additionalParameters: OmnitrackingPageEventParameters,
): OmnitrackingRequestPayload<PageViewEvents> => {
  const correlationId = get(data, 'user.localId', null);
  const user = get(data, 'user', { id: -1, traits: {}, localId: '' });
  const customerId = getCustomerIdFromUser(user);
  const context: EventContext = get(data, 'context', {}) as EventContext;
  const event = getPageEvent(data);

  return {
    event,
    customerId,
    correlationId,
    tenantId: context.tenantId as number,
    clientId: context.clientId as number,
    parameters: {
      ...additionalParameters,
      ...getPlatformSpecificParameters(data),
      ...getCommonParameters(data),
      ...pickPageParameters(data, event),
    },
  };
};

/**
 * @param data      - Event data passed by analytics.
 * @param parameter - Name of the parameter to obtain.
 *
 * @returns The value of the parameter if found in event data or null if not found.
 */
export const getParameterValueFromEvent = (
  data: EventData<TrackTypesValues>,
  parameter: string,
): unknown => {
  let value;

  const searchLocations = [
    data.context,
    data.context.app,
    data.context.event,
    data.properties,
  ];

  for (const location of searchLocations) {
    value = get(location, parameter);

    if (value) {
      return value;
    }
  }

  return null;
};

/**
 * @param valParameters - Properties to be appended to the stringified "val" parameter.
 *
 * @returns The object stringified.
 */
export const getValParameterForEvent = (
  valParameters: ValParameter = {},
): string => {
  return JSON.stringify(valParameters);
};

/**
 * Generates a payment attempt reference ID based on the correlationID (user local
 * ID) and the timestamp of the event.
 *
 * @param data - Event data passed by analytics.
 *
 * @returns The payment attempt reference ID.
 */
export const generatePaymentAttemptReferenceId = (
  data: EventData<TrackTypesValues>,
): string => {
  const correlationId = get(data, 'user.localId', null);
  const timestamp = data.timestamp;

  return `${correlationId}_${timestamp}`;
};

/**
 * Filters the properties object with the `parameters` dictionary, so we don't pass
 * unnecessary information for the event. We search for parameters in many
 * locations: context -\> device -\> app -\> event -\> properties Each location can
 * override the values of the previous one.
 *
 * @param data             - Event data passed by analytics.
 * @param propertiesToPick - Array of property strings to pick. By default will pick all properties
 *                           defined in trackDefinitions variable.
 *
 * @returns Result of the `pick()` method.
 */
export const pickTrackParameters = (
  data: EventData<TrackTypesValues>,
  propertiesToPick = trackDefinitions,
): OmnitrackingTrackEventParameters => {
  return {
    ...pick(data.context, propertiesToPick),
    ...pick(data.context.app, propertiesToPick),
    ...pick(data.context.event, propertiesToPick),
    ...pick(data.properties, propertiesToPick),
  } as OmnitrackingTrackEventParameters;
};

/**
 * Formats tracking data to be sent to omnitracking service to register a custom
 * event.
 *
 * @param data                 - Event data passed by analytics.
 * @param additionalParameters - Additional parameters to be considered.
 *
 * @returns Formatted track data.
 */
export const formatTrackEvent = (
  data: EventData<TrackTypesValues>,
  additionalParameters: OmnitrackingTrackEventParameters,
): OmnitrackingRequestPayload<PageActionEvents> => {
  const user = get(data, 'user', { id: -1, traits: {}, localId: '' });
  const customerId = getCustomerIdFromUser(user);
  const correlationId = get(data, 'user.localId', null);
  const context = get(data, 'context', {}) as EventContext;

  const parameters = {
    ...additionalParameters,
    ...getPlatformSpecificParameters(data),
    ...getCommonParameters(data),
    ...pickTrackParameters(data),
  };

  const hasSystemActionParameter = systemActionParameters.some(
    systemActionParameter => {
      return parameters.hasOwnProperty(systemActionParameter);
    },
  );

  // We infer the PageAction event type by checking the payload for
  // SystemAction parameters. If it does have any SystemAction parameter,
  // we infer it to be a SystemAction type. Else, we assume it is a PageAction.
  // TODO: There are some parameters that may need to be removed from the
  //      parameters object because each PageAction type has a list of
  //      supported parameters but we only know the PageAction type of the event after
  //      we have the full parameters object constructed, which may include
  //      parameters that are not necessary to be sent for the then determined
  //      PageAction event type.
  const event = hasSystemActionParameter
    ? pageActionEventTypes.SYSTEM_ACTION
    : pageActionEventTypes.PAGE_ACTION;

  return {
    tenantId: context.tenantId as number,
    clientId: context.clientId as number,
    correlationId,
    customerId,
    event,
    parameters,
  };
};

/**
 * Type predicate that narrows the type of the passed in payload to a page action
 * payload.
 *
 * @param payload - Omnitracking payload to validate
 *
 * @returns True if the payload is for a page action.
 */
const isPageActionPayload = (
  payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
): payload is OmnitrackingRequestPayload<PageActionEvents> => {
  const event = get(payload, 'event', '');

  return Object.values(pageActionEventTypes).some(value => value === event);
};

/**
 * Validates if the payload to be sent to Omnitracking is correctly formed. For
 * now, it will only check if PageAction events contains the required tid
 * parameter.
 *
 * @param payload - Object corresponding to the payload that Omnitracking service expects.
 *
 * @returns True if the payload is correctly formed, false otherwise.
 */
export const validateOutgoingOmnitrackingPayload = (
  payload: OmnitrackingRequestPayload<PageViewEvents | PageActionEvents>,
) => {
  const isPageAction = isPageActionPayload(payload);

  if (isPageAction) {
    const parameters = get(
      payload,
      'parameters',
      {},
    ) as OmnitrackingTrackEventParameters;

    return !!parameters.tid;
  }

  return true;
};

/**
 * Fetches the searchQuery taking in account the option searchQueryParameters
 * passed by the user or by the default ones.
 *
 * @param data                  - Object corresponding to the payload that Omnitracking service
 *                                expects.
 * @param searchQueryParameters - List of possible searchQueryParameters passed by user.
 *
 * @returns The searchQuery used on the page.
 */
export const getSearchQuery = (
  data: EventData<TrackTypesValues>,
  searchQueryParameters: SearchQueryParameters | undefined | null,
): string | void => {
  const searchQueryParams =
    searchQueryParameters ?? DEFAULT_SEARCH_QUERY_PARAMETERS;

  for (let i = 0; i < searchQueryParams.length; i++) {
    const searchQuery = get(
      data,
      `context.web.window.location.query.${searchQueryParams[i]}`,
    ) as string;

    if (searchQuery) {
      return searchQuery;
    }
  }
};

/**
 * Returns the client language from the culture code, if matches one of the
 * possible client language values. If not, return the default one (en).
 *
 * @param culture - The current culture code.
 *
 * @returns The clientLanguage to be sent on the event.
 */
export const getClientLanguageFromCulture = (culture: string) => {
  const cultureSplit = (culture || '').split('-');
  const clientLanguage = cultureSplit[0];

  return CLIENT_LANGUAGES_LIST.includes(clientLanguage as string)
    ? clientLanguage
    : DEFAULT_CLIENT_LANGUAGE;
};

/**
 * Returns the client country from the culture code.
 *
 * @param culture - The current culture code.
 *
 * @returns The clientCountry to be sent on the event.
 */
export const getCLientCountryFromCulture = (culture: string) => {
  const cultureSplit = (culture || '').split('-');
  const clientCountry = cultureSplit[1];

  return clientCountry;
};