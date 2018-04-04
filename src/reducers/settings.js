// @flow

import { Types } from '../actions';

export type SettingsState = {
  appTheme: boolean
}

const INITIAL_STATE = {
  appTheme: false
};

const settings = ( state: SettingsState = INITIAL_STATE, action) => {
  switch ( action.type ) {
    case Types.SETTINGS_TOGGLE_DARK_THEME:
      return {
        ...state,
        appTheme: !state.appTheme
      };
    default:
      return state;
  }
};

export default settings;