// @flow

import * as React from "react";

import { Creators } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter }   from 'react-router-dom';
import styled                 from 'styled-components';
import Button                 from 'material-ui/Button';
import MdAdd                 from 'react-icons/lib/md/add';

import type { StatusMessage, Order }   from 'app/types/index';
import MoreMenu      from 'app/components/UI/more-menu';
import TextInput      from 'app/components/UI/inputs/text-input';
import FloatButtonContainer      from 'app/components/UI/layout/float-button-container';
import EnhancedTable      from 'app/components/UI/enhanced-table';

import { ORDER_STATUSES, ORDER_STATUS_COLOR, staticOrders } from 'app/config/constants';
import { breakPoints }                                      from 'app/themes';

export type Props = {
  statusMessage: StatusMessage,
  loading: boolean,
  AppLastResponse: typeof Creators.AppLastResponse
}

export type State = {
  search: string,
  filteredOrders: Array<Order>
}

class OrderList extends React.Component<Props, State> {

  constructor ( props ) {
    super( props );

    this.state = {
      search: '',
      filteredOrders: staticOrders
    };
  }

  search = () => {
    setTimeout(() => {
      if ( this.state.search ) {
        this.filterOrders();
      } else {
        this.setState({ filteredOrders: staticOrders });
      }
    }, 100);
  };

  filterOrders = () => {
    const filtered = staticOrders.filter( ( data ) => {
      return data.customer_name.toLowerCase().indexOf( this.state.search.toLowerCase() ) > -1;
    });
    this.setState({ filteredOrders: filtered });
  };

  renderCategories = () => {
    if ( this.state.filteredOrders.length > 0 ) {
      return (
        <ListContainer id={ 'product-list' }>
          <ListItem>
            <ListSection className={ 'header status' }>Status</ListSection>
            <ListSection className={ 'header id' }>Order ID</ListSection>
            <ListSection className={ 'header name' }>Customer</ListSection>
            <ListSection className={ 'header' }>Notes</ListSection>
            <ListSection className={ 'header cost' }>Sub Total</ListSection>
            <ListSection className={ 'header tax' }>Tax</ListSection>
            <ListSection className={ 'header cost' }>Shipping</ListSection>
            <ListSection className={ 'header cost' }>Total</ListSection>
            <ListSection className={ 'header edit' }> </ListSection>
          </ListItem>
          { this.state.filteredOrders.map( ( order, index ) => (
            <ListItem key={ index }>
              <ListSection className={ 'status text-white' } style={{ background: ORDER_STATUS_COLOR[ order.status ] }}>{ ORDER_STATUSES[ order.status ] }</ListSection>
              <ListSection className={ 'id' }>{ order.order_id }</ListSection>
              <ListSection className={ 'name' }>{ order.customer_name }</ListSection>
              <ListSection>{ order.customer_comment }</ListSection>
              <ListSection className={ 'cost' }>{ order.sub_total.toFixed(2) }</ListSection>
              <ListSection className={ 'tax' }>{ order.tax.toFixed(2) }</ListSection>
              <ListSection className={ 'cost' }>{ order.shipping.toFixed(2) }</ListSection>
              <ListSection className={ 'cost' }>{ order.total.toFixed(2) }</ListSection>
              <ListSection className={ 'edit' }>
                <MoreMenu key={ order.order_id } id={ order.order_id } />
              </ListSection>
            </ListItem>
          ) )
          }
        </ListContainer>
      );
    } else {
      return (
        <HelpText key="0" >No products found</HelpText>
      );
    }
  };

  render () {
    return (
      <Container>
        <ContentContainer>
          {/*<InputContainer>
            <TextInput
              value={ this.state.search }
              label={ 'Search by name' }
              onChange={ ( e: SyntheticInputEvent<HTMLInputElement> ) => {
                this.setState({ search: e.target.value });
                this.search();
              } } />
          </InputContainer>*/}
          {/*{ this.renderCategories() }*/}
          <div>
            <EnhancedTable />
          </div>
        </ContentContainer>

        {/*<FloatButtonContainer>
          <Button variant="fab" color="primary" aria-label="add" onClick={ () => this.props.AppLastResponse( { success: true, response: 'Add stuff' } ) }>
            <MdAdd size={ 24 } />
          </Button>
        </FloatButtonContainer>*/}
      </Container>
    );
  }
}

const Container = styled.div`
  margin: auto;
`;

const ContentContainer= styled.div`
`;

const InputContainer = styled.div`
  max-width: 300px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: stretch;
  margin: auto;
  
  & > .card-container {
    flex: 1 1 50%;
    padding: 10px;
  }
  
  @media (min-width: ${ breakPoints.lg }) {
    & > .card-container {
      flex: 1 1 33.33%;
    }
  }
`;

const ListItem = styled.section`
  flex: 1 1 100%;
  background: white;
  margin-bottom: 2px;
  display: flex;
  
  &:first-of-type {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
  
  &:last-of-type {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    overflow: hidden;
  }
`;

const ListSection = styled.article`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 5px;
  
  &.status {
    flex: 0 1 105px;
  }
  
  &.cost, &.id {
    flex: 0 1 90px;
  }
  &.tax {
    flex: 0 1 70px;
  }
  &.cost, &.tax {
    text-align: right;
  }
  &.edit {
    flex: 0 1 40px;
    text-align: center;
  }
  
  &.name {
    flex: 0 1 175px;
  }
  
  &.header {
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const HelpText = styled.div`
  text-align: center;
  font-size: ${ props => props.theme.type.lg.h3 };  
  padding-top: 32px;
`;

const mapStateToProps = ( state ) => {
  return {
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) => bindActionCreators( Creators, dispatch);

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( OrderList ) );