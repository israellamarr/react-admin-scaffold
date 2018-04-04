// @flow

import { Types }             from '../actions';

export type APIState = {
  authorized: boolean,
  error: Object,
  fetchingProducts: boolean,
  refreshing: boolean
}

const INITIAL_STATE = {
  authorized: false,
  error: {},
  fetchingProducts: false,
  refreshing: false
};

const api = ( state: APIState = INITIAL_STATE, action) => {
  switch ( action.type ) {
    case Types.API_AUTHORIZE:
      return {
        ...state,
        authorized: true
      };
    default:
      return state;
  }
};

export default api;