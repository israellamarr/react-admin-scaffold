// @flow

import * as React from "react";
import { connect }                  from 'react-redux';
import { Creators }                 from 'app/actions/index';
import { bindActionCreators }       from 'redux';
import { Link }       from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';

import MdVert         from 'react-icons/lib/md/more-vert';

export type Props = {
  id: string;
  menu: Array<Object>;
}

export type State = {
  moreMenu: Object | null;
}

class ProductCard extends React.Component<Props, State> {

  constructor ( ) {
    super();

    this.state = {
      moreMenu: null
    };
  }

  handleClick = ( e ) => {
    this.setState({ moreMenu: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ moreMenu: null });
  };

  render () {
    const { menu } = this.props;
    return (
      <div className={ 'more-menu' }>
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
          {
            menu.map( item => {
              if ( item.to ) {
                return (
                  <Link to={ item.to }>
                    <MenuItem key={ item.name } onClick={ () => this.handleClose }>{ item.name }</MenuItem>
                  </Link>
                );
              } else {
                return (
                  <MenuItem key={ item.name }
                    onClick={ () => {
                    item.onClick();
                    this.handleClose();
                  } }>{ item.name }</MenuItem>
                );
              }
            })
          }
        </Menu>
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


