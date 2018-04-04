// @flow

import type { Product, StatusMessage } from 'app/types';

export const Types = {
  APP_AUTHORIZED: 'APP_AUTHORIZED',
  APP_LOGIN: 'APP_LOGIN',
  APP_LOGOUT: 'APP_LOGOUT',

  APP_RECEIVE_PRODUCT_LIST: 'APP_RECEIVE_PRODUCT_LIST',
  APP_SET_ACTIVE_VIEW_DOMAIN: 'APP_SET_ACTIVE_VIEW_DOMAIN',
  APP_LAST_RESPONSE: 'APP_LAST_RESPONSE',
  APP_SET_NAV_OPEN: 'APP_SET_NAV_OPEN',
  APP_SET_SIDE_NAV_OPEN: 'APP_SET_SIDE_NAV_OPEN',
  APP_SET_NAV_TITLE: 'APP_SET_NAV_TITLE',
  SETTINGS_TOGGLE_DARK_THEME: 'SETTINGS_TOGGLE_DARK_THEME',

  API_INIT: 'API_INIT',
  API_AUTHORIZE: 'API_AUTHORIZE'
};

export const AppAuthorized = ( userAuthorized: boolean ) => {
  return {
    type: Types.APP_AUTHORIZED,
    userAuthorized
  };
};

export const AppLogin = ( username: string, password: string ) => {
  return {
    type: Types.APP_LOGIN,
    username,
    password
  };
};

export const AppLogout = () => {
  return {
    type: Types.APP_LOGOUT
  };
};

export const AppSetNavOpen = ( navOpen: boolean ) => {
  return {
    type: Types.APP_SET_NAV_OPEN,
    navOpen
  };
};

export const AppSetSideNavOpen = ( navOpen: boolean ) => {
  return {
    type: Types.APP_SET_SIDE_NAV_OPEN,
    navOpen
  };
};

export const AppSetNavTitle = ( navTitle: string ) => {
  return {
    type: Types.APP_SET_NAV_TITLE,
    navTitle
  };
};

export const AppReceiveProductList = ( products: Array<Product> ) => {
  return {
    type: Types.APP_RECEIVE_PRODUCT_LIST,
    products: products
  };
};

export const AppSetActiveViewDomain = ( domain: string ) => {
  return {
    type: Types.APP_SET_ACTIVE_VIEW_DOMAIN,
    domain
  };
};

export const AppLastResponse = ( statusMessage: StatusMessage ) => {
  return {
    type: Types.APP_LAST_RESPONSE,
    statusMessage
  };
};

export const SettingsToggleDarkTheme = () => {
  return {
    type: Types.SETTINGS_TOGGLE_DARK_THEME
  };
};

export const APIInit = () => {
  return {
    type: Types.API_INIT
  };
};

export const APIAuthorize = ( username: string, password: string ) => {
  return {
    type: Types.API_AUTHORIZE,
    username,
    password
  };
};

export const Creators = {
  AppAuthorized,
  AppLogin,
  AppLogout,

  AppReceiveProductList,
  AppSetActiveViewDomain,
  AppSetNavOpen,
  AppSetSideNavOpen,
  AppSetNavTitle,
  AppLastResponse,

  SettingsToggleDarkTheme,

  APIInit,
  APIAuthorize
};