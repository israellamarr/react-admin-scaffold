// @flow

import * as React from "react";

import { Creators } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import styled                 from 'styled-components';
import Grid                   from 'material-ui/Grid';
import Button                 from 'material-ui/Button';
import TextField              from 'material-ui/TextField';
import { InputAdornment }     from 'material-ui/Input';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import MdAdd                  from 'react-icons/lib/md/add';

import type { Product, StatusMessage } from 'app/types/index';
import ProductCard               from 'app/components/UI/product-card';
import FloatButtonContainer      from 'app/components/UI/layout/float-button-container';

import { staticProducts } from 'app/config/constants';
import { breakPoints }    from 'app/themes';

export type Props = {
  products: Array<Product>,
  activeDomain: string,
  statusMessage: StatusMessage,
  loading: boolean,
  AppSetActiveViewDomain: typeof Creators.AppSetActiveViewDomain,
  AppLastResponse: typeof Creators.AppLastResponse
}

export type State = {
  dialogOpen: boolean;
}

class ProductList extends React.Component<Props, State> {

  constructor ( props ) {
    super( props );

    this.state = {
      dialogOpen: false
    };
  }

  componentDidUpdate ( prevProps) {
    if ( this.props.match.params.activeDomain !== prevProps.match.params.activeDomain ) {
      this.props.AppSetActiveViewDomain( this.props.match.params.activeDomain );
    }
  }

  renderProducts () {
    if ( staticProducts.length > 0 ) {
      return (
        <ListContainer id={ 'product-list' }>
          { staticProducts.map( ( product, index ) => (
            ( <ProductCard key={ index } product={ product }/> )
          ) )
          }
        </ListContainer>
      );
    } else {
      return (
        <HelpText key="0" >No products found</HelpText>
      );
    }
  }

  dialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  dialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render () {
    return (
      <Container>
        <ContentContainer>
          { this.renderProducts() }
        </ContentContainer>

        <FloatButtonContainer>
          <Button variant="fab" color="primary" aria-label="add" onClick={ () => this.dialogOpen() }>
            <MdAdd size={ 24 } />
          </Button>
        </FloatButtonContainer>


        <Dialog
          open={ this.state.dialogOpen }
          onClose={ () => this.dialogClose() }
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
          <DialogContent>

            <Grid container spacing={ 16 }>
              <Grid item xs={ 12 } sm={ 6 }>
                <TextField autoFocus margin="dense" id="product_name" label="Name" fullWidth />
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <TextField margin="dense" id="price" label="Price" fullWidth InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} />
              </Grid>
            </Grid>
            <TextField multiline rows="4" margin="dense" id="description" label="Description" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={ () => this.dialogClose() } color="primary">Cancel</Button>
            <Button onClick={ () => this.dialogClose() } color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

const Container = styled.div`
  margin: auto;
`;

const ContentContainer= styled.div`
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: stretch;
  margin: auto;
  margin-left: -10px;
  margin-right: -10px;
  
  & > .card-container {
    flex: 1 1 50%;
    padding: 10px;
  }
  & > .card-container img {
    max-width: 100%;
    width: auto;
  }
  
  @media (min-width: ${ breakPoints.lg }) {
    & > .card-container {
      flex: 1 1 33.33%;
    }
  }
`;

const HelpText = styled.div`
  text-align: center;
  font-size: ${ props => props.theme.type.lg.h3 };  
  padding-top: 32px;
`;

const mapStateToProps = ( state ) => {
  return {
    URLS: state.app.URLS,
    activeDomain: state.app.activeDomain,
    loading: state.api.fetchingProducts,
    products: state.app.products,
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) => bindActionCreators( Creators, dispatch);

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( ProductList ) );