import { mockStore } from '../../../../tests';
import reducer, { actionTypes } from '../../';
import reset from '../reset';

const authenticationMockStore = (state = {}) =>
  mockStore({ authentication: reducer() }, state);

let store;

describe('reset() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = authenticationMockStore();
  });

  it('should create the correct actions when the reset area is called with no subarea prop', async () => {
    expect.assertions(1);

    await store.dispatch(reset());
    expect(store.getActions()).toEqual(
      expect.arrayContaining([{ type: actionTypes.AUTHENTICATION_RESET }]),
    );
  });

  it.each([
    'LOGIN',
    'LOGOUT',
    'PASSWORD_CHANGE',
    'PASSWORD_RECOVER',
    'PASSWORD_RESET',
    'REGISTER',
    'VALIDATE_EMAIL',
    'REFRESH_EMAIL_TOKEN',
    'DELETE_USER_TOKEN',
    'DELETE_USER_IMPERSONATION',
    'CREATE_USER_IMPERSONATION',
    'CREATE_USER_TOKEN',
    'CREATE_CLIENT_CREDENTIALS_TOKEN',
    'REFRESH_USER_TOKEN',
  ])(
    'should create the correct actions when the reset area is called with the %s subarea',
    async subArea => {
      expect.assertions(1);

      await store.dispatch(reset(subArea));
      expect(store.getActions()).toEqual(
        expect.arrayContaining([{ type: actionTypes[`${subArea}_RESET`] }]),
      );
    },
  );
});