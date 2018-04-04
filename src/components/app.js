// @flow

import React from 'react';

import 'normalize.css/normalize.css';
import 'static/scss/app.scss';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

import config                                 from 'app/config/app-config';
import AppHeader                              from 'app/components/app-header';
import SideNav                                from 'app/components/side-nav';
import { Creators }                           from 'app/actions';
import { lightTheme, darkTheme, breakPoints } from 'app/themes';
import Routes                                 from 'app/components/routes';


export type Props = {
  userAuthorized: boolean,
  appTheme: boolean,
  sideNavOpen: boolean,
  navOpen: boolean,
  AppSetSideNavOpen: typeof Creators.AppSetSideNavOpen
}

class App extends React.Component<Props, {}> {

  constructor () {
    super();
  }

  componentDidMount () {}

  contentLayerClicked = ( ) => {
    if ( this.props.sideNavOpen ) {
      this.props.AppSetSideNavOpen( false );
    }
  };

  render () {
    return (
      <ThemeProvider theme={ this.props.appTheme ? darkTheme : lightTheme }>
        <HashRouter>
          <Wrapper className='app-wrapper' sideNavOpen={ this.props.sideNavOpen } >

            <Header onClick={ this.contentLayerClicked }>
              <AppHeader title={ config.title }/>
            </Header>

            <Body topNavOpen={ this.props.navOpen }>
              <Content className={ classNames( { 'navOpen': this.props.sideNavOpen } ) } onClick={ this.contentLayerClicked }>
                <Routes/>
              </Content>
              { this.props.userAuthorized ? <SideNav /> : '' }
            </Body>
          </Wrapper>
        </HashRouter>
      </ThemeProvider>
    );
  }
}

const globals = css`
  color: ${ props => props.theme.color };
  background-color: ${ props => props.theme.bg };
  font-family: ${ props => props.theme.type.font }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  transition: 300ms;
  transition-property: background-color, color;
  display: flex;
  flex-direction: column;
  ${ globals }
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  z-index: 4;
`;


const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${ props => props.theme.contentBG };
  transition: 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-property: margin-top, background-color, color;
  overflow: hidden;
  display: flex; 
  flex-direction: column;
  
  @media (min-width: ${ breakPoints.md }) {
    flex-direction: row;
  }
`;

const Content = styled.div`
  flex-grow: 2;
  width: 100%;
  height: 100%;
  background-color: ${ props => props.theme.contentBG } ;
  transition: 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-property: margin-top, opacity, background-color;
  overflow-y: auto;
  
  @media (max-width: ${ breakPoints.md }) {
    &.navOpen {
      opacity: .25;
      user-select: none;
      overflow-y: hidden;
    }
  }
`;

const mapStateToProps = ( state ) => {
  return {
    userAuthorized: state.app.userAuthorized,
    appTheme: state.settings.appTheme,
    sideNavOpen: state.app.sideNavOpen,
    navOpen: state.app.navOpen
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( App );