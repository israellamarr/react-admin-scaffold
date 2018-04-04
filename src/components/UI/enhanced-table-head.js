// @flow

import * as React from "react";

import { Creators } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { staticOrders } from 'app/config/constants';

export const EnhancedTableToolbar = ( classes: Object, numSelected: number ) => {
  return (
    <Toolbar>
      <div>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title">Orders</Typography>
        )}
      </div>
    </Toolbar>
  );
};

export type Props = {
  numSelected: number;
  onRequestSort: Function;
  onSelectAllClick: Function;
  order: string;
  orderBy: string;
  rowCount: number;
};

export type State = {};

class EnhancedTableHead extends React.Component<Props, State> {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell key={ 'edit' } padding={ 'none' }> </TableCell>
          {
            Object.keys( staticOrders[ 0 ] ).map( ( key, index ) => {
              if ( key !== 'products' ) {
                return (
                  <TableCell key={ index }
                    numeric={ ! isNaN(staticOrders[ key ]) }
                    padding={ 'checkbox' }
                    sortDirection={ orderBy ===  key ? order : false }
                    className={ 'text-right' }>
                    <TableSortLabel active={ orderBy ===  key }
                      direction={ order }
                      onClick={ this.createSortHandler( key ) }
                      className={ 'text-right' }>
                      { key }
                    </TableSortLabel>
                  </TableCell>
                );
              }
            } )
          }
        </TableRow>
      </TableHead>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {

  };
};

const mapDispatchToProps = ( dispatch ) =>
  bindActionCreators( Creators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( EnhancedTableHead );