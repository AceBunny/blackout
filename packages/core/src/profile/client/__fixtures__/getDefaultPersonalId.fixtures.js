import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (userId, response) => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, '/personalids/default'),
      {
        method: 'get',
        response: response,
        status: 200,
      },
    );
  },
  failure: userId => {
    moxios.stubRequest(
      join('/api/account/v1/users', userId, '/personalids/default'),
      {
        method: 'get',
        response: 'stub error',
        status: 404,
      },
    );
  },
};