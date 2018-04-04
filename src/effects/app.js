// @flow

import { Types, Creators }                from '../actions';

function tryLogin ( { action, dispatch} ) {
  if ( action.username !== "abc" ) {
    dispatch( Creators.AppLastResponse( { success: false, response: 'Could not find user.' } ) );
  } else if ( action.password !== "123" ) {
    dispatch( Creators.AppLastResponse( { success: false, response: 'Password incorrect.' } ) );
  } else {
    dispatch( Creators.AppLastResponse( { success: true, response: 'User authorized.' } ) );
    dispatch( Creators.AppAuthorized( true ) );
  }
}

function destroySession ( { action, dispatch} ) {
  dispatch( Creators.AppLastResponse( { success: true, response: 'User logged out.' } ) );
  dispatch( Creators.AppAuthorized( false ) );
}

function onDomainChange ( { action, dispatch} ) {
  console.log( action );
}

export default [
  { action: Types.APP_LOGIN, effect: tryLogin },
  { action: Types.APP_LOGOUT, effect: destroySession },
  { action: Types.APP_SET_ACTIVE_VIEW_DOMAIN, effect: onDomainChange }
];
