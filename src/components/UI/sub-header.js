// @flow

import * as React from "react";

import styled from 'styled-components';

import { connect }                  from 'react-redux';
import { Creators }                 from 'app/actions/index';
import { bindActionCreators }       from 'redux';

import { shadowMixin } from 'app/themes/mixins';

export type Props = {
  title: string
}

export type State = {}

class SubHeader extends React.Component<Props, State> {

  constructor ( ) {
    super();
  }

  render () {
    let { title } = this.props;
    return (
      <Container>
        <Header>
          <Dflex>{ title }</Dflex>
        </Header>
      </Container>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {

  };
};

const Container = styled.div`
  content: '';
  display: block;
  height: 48px;
  width: 100%;
`;
const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  color: ${ props => props.theme.color };
  background-color: ${ props => props.theme.bg };
  padding: 8px 20px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${ shadowMixin( 1 ) };
`;

const Dflex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( SubHeader );