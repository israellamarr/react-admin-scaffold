// @flow

import * as React from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Creators } from 'app/actions/index';
import { bindActionCreators } from 'redux';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import FormContainer from 'app/components/UI/layout/form-container';
import type { Product, StatusMessage } from 'app/types/index';
import TextInput                     from 'app/components/UI/inputs/text-input';
import SelectList                    from 'app/components/UI/inputs/select-list';
import SplitContainer from 'app/components/UI/layout/split-container';
import SubmitButton from 'app/components/UI/inputs/submit-button';
import CancelButton from 'app/components/UI/inputs/cancel-button';
import ButtonContainer from 'app/components/UI/layout/button-container';

const numberMask = createNumberMask({
  prefix: '',
  requireDecimal: true
});

export type Props = {
  product: Product,
  statusMessage: StatusMessage,
  APIAddProduct: typeof Creators.APIAddProduct
}

export type State = {
  product: Product,
  errors: Object,
}

class AddProduct extends React.Component<Props, State> {

  constructor () {
    super();
    this.state = {
      product: {
        product_id: '',
        product_name: '',
        product_type: 'survey',
        category: 'lighting',
        price: '0.00',
        description: '',
        img_slug: '',
        url: ''
      },
      errors: {},
    };
  }

  validateForm = () => {
    let valid = true;
    let newErrors = {};
    if ( ! this.state.product.product_type ) {
        valid = false;
        newErrors.product_type = ['Product type is required'];
    }
    if ( ! this.state.product.product_name ) {
        valid = false;
        newErrors.product_name = ['Product name is required'];
    }
    if ( ! this.state.product.category ) {
        valid = false;
        newErrors.category = ['Business Line is required'];
    }
    if ( ! this.state.product.description ) {
        valid = false;
        newErrors.description = ['Description is required'];
    }
    if ( ! this.state.product.url ) {
      valid = false;
      newErrors.url = ['URL is required'];
    }
    if ( newErrors ) {
      this.setState({ errors: { ...this.state.errors, ...newErrors } });
    } else {
      this.setState({ errors: {} });
    }
    return valid;
  };

  submitForm = () => {
    if ( this.validateForm() ) {
      this.props.APIAddProduct( this.state.product );
    }
  };

  render () {
    const productTypes: Array<Object> = [
      { title: 'survey', value: 'SURVEY' },
      { title: 'static', value: 'STATIC' }
    ];
    const categories: Array<Object> = [
      { title: 'lighting', value: 'lighting' },
      { title: 'accessories', value: 'accessories' },
      { title: 'furniture', value: 'furniture' },
      { title: 'desks', value: 'desks' }
    ];

    return (
      <Container>
        <SplitContainer>
          <article>
            <label className={ 'label' }>Product Type</label>
            <SelectList
              value={ this.state.product.product_type }
              data={ productTypes }
              onChange={ ( event: SyntheticInputEvent<HTMLSelectElement> ) => this.setState({ product: { ...this.state.product, 'product_type': event.target.value } }) } />
          </article>
          <article>
            <label className={ 'label' }>Business Line</label>
            <SelectList
              value={ this.state.product.category }
              data={ categories }
              onChange={ ( value: string ) => this.setState({ product: { ...this.state.product, 'category': value } }) } />
          </article>
        </SplitContainer>
        <TextInput
          label={ 'Name' }
          value={ this.state.product.product_name }
          error={ this.state.errors.product_name }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ product: { ...this.state.product, 'product_name': event.target.value } }) } />
        <TextInput
          label={ 'Price' }
          value={ this.state.product.price }
          error={ this.state.errors.price }
          keepCharPositions={ false }
          mask={ numberMask }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ product: { ...this.state.product, 'price': event.target.value } }) } />
        <TextInput
          label={ 'Description' }
          value={ this.state.product.description }
          error={ this.state.errors.description }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ product: { ...this.state.product, 'description': event.target.value } }) } />
        <TextInput
          label={ 'URL' }
          value={ this.state.product.url }
          error={ this.state.errors.url }
          onChange={ ( event: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ product: { ...this.state.product, 'url': event.target.value } }) } />
        <ButtonContainer>
          <SubmitButton onClick={ this.submitForm }>Add</SubmitButton>
          <Link to={ '/products/all' }>
            <CancelButton>
              Cancel
            </CancelButton>
          </Link>
        </ButtonContainer>
      </Container>
    );
  }
}

const Container = FormContainer.extend`
  
`;

const mapStateToProps = ( state ) => {
  return {
    statusMessage: state.app.statusMessage
  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch );

export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)( AddProduct ) );

