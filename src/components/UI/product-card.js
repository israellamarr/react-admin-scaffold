// @flow

import * as React from "react";


import { connect }                  from 'react-redux';
import { Creators }                 from 'app/actions/index';
import { bindActionCreators }       from 'redux';
import { InputAdornment }           from 'material-ui/Input';
import TextField                    from 'material-ui/TextField';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import IconButton                   from 'material-ui/IconButton';
import Collapse                     from 'material-ui/transitions/Collapse';
import Menu, { MenuItem }           from 'material-ui/Menu';
import Button                       from 'material-ui/Button';

import MdEdit           from 'react-icons/lib/md/edit';
import MdVert           from 'react-icons/lib/md/more-vert';

import type { Product } from 'app/types';
import SplitContainer   from 'app/components/UI/layout/split-container';

export type Props = {
  product: Product,
  APIDeleteProduct: typeof Creators.APIDeleteProduct,
  AppLastResponse: typeof Creators.AppLastResponse
}

export type State = {
  product: Object,
  expanded: boolean;
  moreMenu: Object | null;
}

class ProductCard extends React.Component<Props, State> {

  constructor ( ) {
    super();

    this.state = {
      product: {
        product_name: '',
        price: '',
      },
      moreMenu: null,
      expanded: false
    };
  }

  componentDidMount() {
    this.setState( { product: { product_name: this.props.product.product_name, price: this.props.product.price } } );
  }


  expandEdit = () => {
    this.setState( { expanded: ! this.state.expanded } );
  };

  submitEdit = () => {
    this.props.AppLastResponse( { success: true, response: 'product updated.' } );
  };

  handleClick = ( e ) => {
    this.setState({ moreMenu: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ moreMenu: null });
  };

  renderProduct = () => {
    let { product } = this.props;
    if ( product ) {
      return (
        <Card style={{ display: 'flex', flexWrap: 'wrap', height: '100%' }}>
          <section style={{ flex: 'auto', marginRight: 'auto', maxWidth: '180px', padding: '10px' }}><img src={ `${ product.img_slug }` } /></section>
          <section style={{ flex: 1 }}>
            <CardHeader
              action={
                <div>
                  <IconButton
                    onClick={ () => this.expandEdit() }
                    aria-expanded={ this.state.expanded }
                    aria-label="Edit">
                    <MdEdit size={ 24 } />
                  </IconButton>
                  <IconButton
                    aria-owns={ this.state.moreMenu ? 'simple-menu' : null }
                    aria-haspopup="true"
                    onClick={ this.handleClick } >
                    <MdVert size={ 24 } />
                  </IconButton>
                </div>
              }
              title={ product.product_name }
              subheader={ <span style={{ color: 'grey' }}>${ product.price }</span> } />
            <Menu
              id="simple-menu"
              anchorEl={ this.state.moreMenu }
              open={ Boolean(this.state.moreMenu) }
              onClose={ this.handleClose }>
              <MenuItem onClick={ () => this.handleClose }>Preview</MenuItem>
              <MenuItem onClick={ () => this.handleClose }>Duplicate</MenuItem>
              <MenuItem onClick={ () => this.handleClose }>Copy Link</MenuItem>
              <MenuItem onClick={ () => this.handleClose }>Delete</MenuItem>
            </Menu>
            <CardContent>{ product.description }</CardContent>
          </section>
          <Collapse className={ 'w-100' } in={ this.state.expanded } unmountOnExit>
            <CardContent style={{flex: '1 1 100%'}}>
              <SplitContainer style={{ marginBottom: '16px' }}>
                <article>
                  <TextField
                    autoFocus
                    value={ this.state.product.product_name }
                    margin="normal"
                    label="Name"
                    fullWidth
                    onChange={ ( e: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ product: { ...this.state.product, product_name: e.target.value } }) } />
                </article>
                <article>
                  <TextField
                    value={ this.state.product.price }
                    label="Price"
                    margin="normal"
                    onChange={ ( e: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ product: { ...this.state.product, price: e.target.value } }) }
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    fullWidth />
                </article>
              </SplitContainer>
              <Button variant="raised" onClick={ () => this.submitEdit() } color="primary">Save</Button>
            </CardContent>
          </Collapse>
        </Card>
      );
    }
  };
  render () {
    return (
      <div className={ 'card-container' }>
        { this.renderProduct() }
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {

  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ProductCard );