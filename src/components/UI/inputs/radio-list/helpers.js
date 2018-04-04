// @flow

import type { RadioListData } from '../constants.js';

/**
 * Validates that's the radio list data passes generic checks
 * @param  {Array} datas [description]
 * @return {boolean}       [description]
 */
export function radioListValidate ( datas: Array<RadioListData> ): boolean {
  const whitespace = /^\s*$/;
  const valid = datas.filter( data => {
    if ( data.has_text ) {
      if ( ( data.value === data.set ) && data.text ) {
        if ( !whitespace.test( data.text ) ) {
          return true;
        }
      }

      return false;
    }

    if ( data.set ) {
      return data.value;
    }

    return data.value === true;
  } );

  return valid.length > 0;
}

/**
 * Get an object of just key value pairs of the radio list data
 * @param  {Array} datas [description]
 * @return {Object}       [description]
 */
export function radioListFields ( datas: Array<RadioListData> ): Object {
  const ret = {};
  datas.forEach( data => {
    ret[ data.field ] = data.value;

    if ( data.text_field ) {
      ret[ data.text_field ] = data.text;
    }
  } );

  return ret;
}

/**
 * Get the value of the selected item from the data set
 * @param  {Array} datas [description]
 * @return {string | null}       [description]
 */
export function radioListValue ( datas: Array<RadioListData> ): ?string {
  let ret = null;
  datas.forEach( data => {
    if ( data.value ) {
      ret = data.set;
    }
  } );

  return ret;
}

/**
 * Get the value of the selected text field (if applicable)
 * @param  {Array} datas [description]
 * @return {string | null}       [description]
 */
export function radioListText ( datas: Array<RadioListData> ): ?string {
  let ret = null;
  datas.forEach( data => {
    if ( data.value ) {
      ret = data.text;
    }
  } );

  return ret;
}
