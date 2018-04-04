// @flow

import React, { Fragment } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { Creators } from 'app/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import styled from 'styled-components';
import Button from 'material-ui/Button';

import { shadowMixin } from 'app/themes/mixins';
import { breakPoints } from 'app/themes';
// import ThemeToggle from 'app/components/UI/inputs/theme-toggle';
import { links } from 'app/components/routes/config';

export type Props = {
  sideNavOpen: boolean,
  AppSetSideNavOpen: typeof Creators.AppSetSideNavOpen,
  AppLogout: typeof Creators.AppLogout
}

class SideNav extends React.Component<Props, {}> {
  constructor ( props ) {
    super( props );
  }

  isSelected ( module, parent ) {
    if ( !parent ) {
      const name = module.subNav ? `${ module.to }/${ module.rootTo }`: module.to;
      return this.props.location.pathname.indexOf( name ) !== -1;
    } else {
      return this.props.location.pathname.indexOf( `${ parent.to }/${ module.to}` ) !== -1;
    }
  }

  isActive ( module ) {
    const name = module.subNav ? module.to : `${ module.to }/${ module.rootTo }`;
    return this.props.location.pathname.indexOf( name ) !== -1;
  }

  render () {
    return (
      <SideNavWrapper className={ classNames( { 'hidden': !this.props.sideNavOpen } ) }>
        <Links onClick={ e => this.props.AppSetSideNavOpen( false ) }>
          {
            links.map( ( module, i )=> (
              <Fragment key={ i }>
                <Link
                  replace={ this.isSelected( module ) }
                  to={ {
                    pathname: module.rootTo ? `/${  module.to }/${  module.rootTo }` : `/${  module.to }`
                  } }>
                  <NavLink className={ classNames( { 'selected' : this.isSelected( module ) } ) }>
                    { module.name }
                  </NavLink>
                </Link>
                <SubNavContainer className={ classNames( { 'active-nav' : this.isActive( module ) } ) }>
                  { module.subNav ?
                    module.subNav.map( ( sub, i ) => (
                      <Link key={ i } to={ `/${ module.to }/${ sub.to }` }
                        replace={ this.isSelected( sub, module ) } >
                        <SubNavLink className={ classNames( { 'selected' : this.isSelected( sub, module ) } ) }>
                          { sub.name }
                        </SubNavLink>
                      </Link>
                    ) )
                    : ''}
                </SubNavContainer>
              </Fragment>
            ) )
          }
        </Links>
        {/*<ThemeToggle/>*/}
        <Button variant="raised" color="secondary" className={ 'mb-3' } onClick={ () => this.props.AppLogout() }>Logout</Button>
      </SideNavWrapper>
    );
  }
}

const SideNavWrapper = withRouter( styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  display: flex;
  right: 0;
  width: ${ props => props.theme.layout.sideNavWidthPx }px;
  height: calc( 100vh - ${ props => props.theme.layout.headerHeightPx }px );
  overflow-y: hidden;  
  background-color: ${ props => props.theme.sideNavBG };
  box-shadow: ${ shadowMixin( 1 ) };
  transition: 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-property: left;
  z-index: 3;
    
  &.hidden {
    right: -${ props => props.theme.layout.sideNavWidthPx + 1 }px;
  }

  a {
    text-decoration: none;
    color: ${ props => props.theme.color };
  } 

  @media (min-width: ${ breakPoints.md }) {

    width: ${ props => props.theme.layout.sideNavWidthDesktopPx }px;
    position: relative;   
    &.hidden {
      right: 0;
    }
  }
`);

const Links = styled.div`
  width: 100%;
`;

const NavLink = styled.div`
  height: 48px;
  display: flex;
  padding-left: ${ props => props.theme.layout.contentMarginPx }px;
  font-size: ${ props => props.theme.layout.navLinkFontSize }px;
  align-items: center;
  text-transform: capitalize;
  transition: background-color 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    background-color: ${ props => props.theme.trimColorHover };
  }
  
  &.selected {
    background-color: ${ props => props.theme.trimColor };
  }
`;

const Logout = NavLink.extend`
  margin-top: auto;
`;

const SubNavContainer = styled.section`
  &:not(.active-nav) {
    display: none;
  }
`;

const SubNavLink = NavLink.extend`
  height: 32px;
  padding-left: ${ props => props.theme.layout.contentMarginPx * 1.5 }px;
  font-size: ${ props => props.theme.layout.navLinkFontSize * .85}px;
  overflow-x: hidden;
`;

const mapStateToProps = ( state ) => {
  return {
    sideNavOpen: state.app.sideNavOpen
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( SideNav ) );