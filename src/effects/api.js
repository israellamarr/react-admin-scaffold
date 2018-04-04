// @flow

import { Types } from '../actions';

export async function initAPI ( { action, dispatch }) {
  console.log('initAPI');
}

export default [
  { action: Types.API_INIT, effect: initAPI }
];