// @flow

import { Types }                       from '../actions';
import type { Product, StatusMessage } from 'app/types';

export type AppState = {
  activeDomain: string,
  products: Array<Product>,
  activeProduct: Product,
  activeProductLoading: boolean,
  fetchingViewProduct: boolean,
  statusMessage: StatusMessage,
  navTitle: string,
  navOpen: boolean,
  sideNavOpen: boolean,
  userAuthorized: boolean
}

const INITIAL_STATE = {
  activeDomain: 'all',
  products: [],
  activeProduct: null,
  activeProductLoading: false,
  statusMessage: {
    success: false,
    response: null
  },
  navTitle: 'Nav title',
  navOpen: true,
  sideNavOpen: false,
  userAuthorized: false
};

const app = ( state: AppState = INITIAL_STATE, action) => {
  switch ( action.type ) {
    case Types.APP_AUTHORIZED:
      return {
        ...state,
        userAuthorized: action.userAuthorized
      };
    case Types.APP_RECEIVE_PRODUCT_LIST:
      return {
        ...state,
        products: action.products
      };
    case Types.APP_SET_ACTIVE_VIEW_DOMAIN:
      return {
        ...state,
        activeDomain: action.domain,

      };
    case Types.APP_SET_NAV_OPEN:
      return {
        ...state,
        navOpen: action.navOpen
      };
    case Types.APP_SET_SIDE_NAV_OPEN:
      return {
        ...state,
        sideNavOpen: action.navOpen
      };
    case Types.APP_SET_NAV_TITLE:
      return {
        ...state,
        navTitle: action.navTitle
      };
    case Types.APP_LAST_RESPONSE:
      return {
        ...state,
        statusMessage: action.statusMessage
      };
    default:
      return state;
  }
};

export default app;