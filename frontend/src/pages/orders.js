import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { ordersSelector } from 'selectors';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    const { classes, orders } = this.props;

    return (
      <div>
        <h1>Orders</h1>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Business</TableCell>
              <TableCell>Variety</TableCell>
              <TableCell numeric>Quantity</TableCell>
              <TableCell numeric>Starting Unit Price</TableCell>
              <TableCell numeric>Total Cost</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(row => (
              <TableRow key={row.prim_key}>
                <TableCell component="th" scope="row">
                  {row.business.name}
                </TableCell>
                <TableCell numeric>{row.variety.name}</TableCell>
                <TableCell numeric>{row.quantity}</TableCell>
                <TableCell numeric>${row.budget_unit_price}</TableCell>
                <TableCell numeric>${row.total_cost}</TableCell>
                <TableCell>
                  <Link to={`/bid/${row.prim_key}`}>BID</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Component.propTypes = {};

const mapStateToProps = state => {
  return {
    orders: ordersSelector(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
