import * as fromLocale from '../reducer';
import * as selectors from '../selectors';
import {
  mockCities,
  mockCitiesEntities,
  mockCountriesEntities,
  mockCountry,
  mockCountryCode,
  mockStateId,
  mockStates,
  mockStatesEntities,
} from 'tests/__fixtures__/locale';

describe('locale redux selectors', () => {
  const mockState = {
    locale: {
      countryCode: mockCountryCode,
      cities: {
        isLoading: false,
        error: null,
      },
      countries: {
        isLoading: false,
        error: null,
      },
      currencies: {
        isLoading: false,
        error: null,
      },
      states: {
        isLoading: false,
        error: null,
      },
    },
    entities: {
      cities: mockCitiesEntities,
      countries: mockCountriesEntities,
      states: mockStatesEntities,
    },
  };

  beforeEach(jest.clearAllMocks);

  describe('areCountryCitiesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.cities.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCountryCitiesLoading');

      expect(selectors.areCountryCitiesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryCitiesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.cities.error;
      const spy = jest.spyOn(fromLocale, 'getCountryCitiesError');

      expect(selectors.getCountryCitiesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areCountriesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.countries.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCountriesLoading');

      expect(selectors.areCountriesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountriesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.countries.error;
      const spy = jest.spyOn(fromLocale, 'getCountriesError');

      expect(selectors.getCountriesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areCountryCurrenciesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.currencies.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCountryCurrenciesLoading');

      expect(selectors.areCountryCurrenciesLoading(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryCurrenciesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.currencies.error;
      const spy = jest.spyOn(fromLocale, 'getCountryCurrenciesError');

      expect(selectors.getCountryCurrenciesError(mockState)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areCountryStatesLoading()', () => {
    it('should get the loading status', () => {
      const expectedResult = mockState.locale.states.isLoading;
      const spy = jest.spyOn(fromLocale, 'getAreCountryStatesLoading');

      expect(selectors.areCountryStatesLoading(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryStatesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.locale.states.error;
      const spy = jest.spyOn(fromLocale, 'getCountryStatesError');

      expect(selectors.getCountryStatesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCountryCode()', () => {
    it('should get the country code', () => {
      expect(selectors.getCountryCode(mockState)).toEqual(mockCountryCode);
    });
  });

  describe('getCountryCultureCode()', () => {
    it('should get the culture code', () => {
      expect(selectors.getCountryCultureCode(mockState)).toEqual(
        mockCountry.cultures[0],
      );
    });
  });

  describe('getCountryCurrencyCode()', () => {
    it('should get the currency code', () => {
      expect(selectors.getCountryCurrencyCode(mockState)).toEqual(
        mockCountry.currencies[0].isoCode,
      );
    });
  });

  describe('getCountryStructure()', () => {
    it('should get the subfolder', () => {
      expect(selectors.getCountryStructure(mockState)).toEqual(
        mockCountry.structure,
      );
    });
  });

  describe('getCountryStructures()', () => {
    it('should get the list of subfolders for a given country code', () => {
      expect(selectors.getCountryStructures(mockState)).toEqual(
        mockCountry.structures,
      );
    });
  });

  describe('getCountryCurrencies()', () => {
    it('should get all the currencies to a specific countryCode', () => {
      expect(selectors.getCountryCurrencies(mockState)).toEqual(
        mockCountry.currencies,
      );
    });
  });

  describe('getCountryCities()', () => {
    it('should get all the cities to a specific stateId', () => {
      expect(selectors.getCountryCities(mockState, mockStateId)).toEqual([
        mockCities[0],
      ]);
    });
  });

  describe('getCountryStates()', () => {
    it('should get all the states to a specific countryCode', () => {
      expect(selectors.getCountryStates(mockState)).toEqual([
        { ...mockStates[0], cities: [mockCities[0].id] },
        { ...mockStates[1], cities: [mockCities[1].id] },
      ]);
    });
  });
});