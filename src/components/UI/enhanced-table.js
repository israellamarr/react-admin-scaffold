// @flow

import * as React from "react";

import { Creators }                                from '../../actions/index';
import { connect }                                 from 'react-redux';
import { bindActionCreators }                      from 'redux';
import classNames from 'classnames';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
}                                                  from 'material-ui/Table';
import Paper                                       from 'material-ui/Paper';
import MoreMenu from 'app/components/UI/more-menu';
import EnhancedTableHead, { EnhancedTableToolbar } from 'app/components/UI/enhanced-table-head';
import { ORDER_STATUS_COLOR, ORDER_STATUSES, staticOrders }        from 'app/config/constants';

export type Props = {
  AppLastResponse: typeof Creators.AppLastResponse
};

export type State = {
  order: string,
  orderBy: string,
  selected: any,
  data: Array<Object>,
  page: number,
  rowsPerPage: number,
  orderMenu: Array<Object>
};

class EnhancedTable extends React.Component<Props, State> {
  constructor( props ) {
    super( props );

    this.state = {
      order: 'asc',
      orderBy: 'order_id',
      selected: [],
      data: staticOrders.sort((a, b) => (a.total < b.total ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      orderMenu: [
        { name: 'Edit', onClick: () => this.props.AppLastResponse({ success: true, response: 'Edit order' }) },
        { name: 'Duplicate', onClick: () => this.props.AppLastResponse({ success: true, response: 'Duplicate order' }) },
        { name: 'Change Status', onClick: () => this.props.AppLastResponse({ success: true, response: 'Change Status order' }) },
        { name: 'Copy Link', onClick: () => this.props.AppLastResponse({ success: true, response: 'Link copied!' }) },
        { name: 'Delete', onClick: () => this.props.AppLastResponse({ success: true, response: 'Delete order'}) }
      ]
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = order === 'desc'
              ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
              : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.order_id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, order_id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(order_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, order_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = order_id => this.state.selected.indexOf(order_id) !== -1;

  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={ 'w-100' }>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div style={{
          overflowX: 'auto',
          width: '100%',
          display: 'block'
        }}>
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length} />
            <TableBody>
              {
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                  ( n ) => {
                    const isSelected = this.isSelected(n.order_id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.order_id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.order_id}
                        selected={isSelected}>

                        <TableCell
                          key={ 'edit' }
                          padding={ 'none' }>
                          <MoreMenu key={ n.order_id } id={ n.order_id } menu={ this.state.orderMenu } />
                        </TableCell>

                        {
                          Object.keys( n ).map(
                            ( key, i ) => {
                              if ( key !== 'products' ) {
                                return (
                                  <TableCell
                                    key={ i }
                                    numeric={ ! isNaN(n[ key ]) }
                                    padding={ 'checkbox' }
                                    sortDirection={ orderBy === key ? order : false }
                                    className={ classNames({ 'f-600 text-white text-left': key === 'status' }) }
                                    style={{ background: key === 'status' ? ORDER_STATUS_COLOR[ n.status ] : '' }}>
                                    { key === 'status' ? ORDER_STATUSES[ n.status ] : n[ key ] }
                                  </TableCell>
                                );
                              }
                            }
                          )
                        }
                      </TableRow>
                    );
                  }
                )
              }
              {
                emptyRows > 0
                &&
                (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={ 6 }> </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={ 6 }
                  count={ data.length }
                  rowsPerPage={ rowsPerPage }
                  page={ page }
                  backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                  nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                  onChangePage={ this.handleChangePage }
                  onChangeRowsPerPage={ this.handleChangeRowsPerPage } />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
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
)( EnhancedTable );