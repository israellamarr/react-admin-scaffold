// @flow

import * as React from "react";

import type { Category } from 'app/types/index';

import { connect }                  from 'react-redux';
import { Creators }                 from 'app/actions/index';
import { bindActionCreators }       from 'redux';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';

import MdEdit         from 'react-icons/lib/md/edit';
import MdVert         from 'react-icons/lib/md/more-vert';
import TextInput      from 'app/components/UI/inputs/text-input';
import SplitContainer from 'app/components/UI/layout/split-container';

export type Props = {
  category: Category,
  APIDeleteProduct: typeof Creators.APIDeleteProduct,
  AppLastResponse: typeof Creators.AppLastResponse
}

export type State = {
  category: Object,
  expanded: boolean;
  moreMenu: Object | null;
}

class ProductCard extends React.Component<Props, State> {

  constructor ( ) {
    super();

    this.state = {
      category: {
        category_name: '',
        description: '',
      },
      moreMenu: null,
      expanded: false
    };
  }

  componentDidMount() {
    this.setState( { category: { category_name: this.props.category.category_name, url: this.props.category.url } } );
  }


  expandEdit = () => {
    this.setState( { expanded: ! this.state.expanded } );
  };

  submitEdit = () => {
    this.props.AppLastResponse( { success: true, response: 'category updated.' } );
  };

  handleClick = ( e ) => {
    this.setState({ moreMenu: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ moreMenu: null });
  };

  renderProduct = () => {
    let { category } = this.props;
    if ( category ) {
      return (
        <Card>
          <CardHeader
            title={ category.category_name }
            subheader={ category.description }
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
                <Menu
                  id="simple-menu"
                  anchorEl={ this.state.moreMenu }
                  open={ Boolean(this.state.moreMenu) }
                  onClose={ this.handleClose }>
                  <MenuItem  onClick={ () => this.handleClose }>Preview</MenuItem>
                  <MenuItem  onClick={ () => this.handleClose }>Duplicate</MenuItem>
                  <MenuItem  onClick={ () => this.handleClose }>Copy Link</MenuItem>
                  <MenuItem  onClick={ () => this.handleClose }>Delete</MenuItem>
                </Menu>
              </div>
            } />
          <Collapse in={ this.state.expanded } timeout="auto" unmountOnExit>
            <CardContent>
              <SplitContainer>
                <article>
                  <TextInput
                    value={ this.state.category.category_name }
                    label={ 'Name' }
                    onChange={ ( e: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ category: { ...this.state.category, category_name: e.target.value } }) } />
                </article>
                <article>
                  <TextInput
                    value={ this.state.category.url }
                    label={ 'URL' }
                    onChange={ ( e: SyntheticInputEvent<HTMLInputElement> ) => this.setState({ category: { ...this.state.category, url: e.target.value } }) } />
                </article>
              </SplitContainer>
              <Button variant="raised" color="primary" onClick={ () => this.submitEdit() }>Save</Button>
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