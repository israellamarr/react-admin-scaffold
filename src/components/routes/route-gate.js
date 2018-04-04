// @flow

import * as React from "react";
import { Redirect }                  from 'react-router-dom';
import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';

import Loader from 'app/components/UI/loader';
import type { RouteConfig } from 'app/components/routes/config';
import { withRouter } from 'react-router-dom';

export type Props = {
  match: Object,
  appState: Object,
  route: RouteConfig,
  AppSetNavOpen: typeof Creators.AppSetNavOpen,
  AppSetNavTitle: typeof Creators.AppSetNavTitle,
  AppSetActiveProductID: typeof Creators.AppSetActiveProductID,
  AppSetActiveViewDomain: typeof Creators.AppSetActiveViewDomain,
}

export type State = {

}

class RouteGate extends React.Component<Props, State> {

  componentDidMount () {
    if ( this.props.match.params.productID ) {
      this.props.AppSetActiveProductID( this.props.match.params.productID );
    }

    if ( this.props.match.params.activeDomain ) {
      this.props.AppSetActiveViewDomain( this.props.match.params.activeDomain );
    }

    // this.props.AppSetNavOpen( this.props.route.navOpen );
    // if ( this.props.route.navOpen ) {
    //   this.props.AppSetNavTitle( this.props.route.name );
    // }
  }

  render () {
    if ( this.props.route.authorization && ! this.props.appState.app.userAuthorized ) {
      return (
        <Redirect to={ '/login' } />
      );
    }
    return (
      <div className={ 'route-block' }>
        {
          this.props.route.header ? this.props.route.header() : ''
        }
        {
          this.props.route.dependenciesReady( this.props.appState ) ?
            this.props.route.render()
            :
            <Loader type={ 'spin' }/>
        }
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    appState: state
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( RouteGate ) );