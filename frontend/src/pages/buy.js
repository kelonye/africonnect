import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { myBusinessesSelector, myOrdersSelector } from 'selectors';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({});

class Component extends React.Component {
  renderBusinesses() {
    const { classes, businesses } = this.props;
    return (
      <div>
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          My Businesses &nbsp;
          <Link to="/add-business" style={{ fontSize: 18 }}>
            +
          </Link>
        </h2>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {businesses.map(row => (
              <TableRow key={row.prim_key}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>
                  <Link to={`/business/${row.prim_key}`}>VIEW</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  renderOrders() {
    const { classes, orders } = this.props;
    return (
      <div>
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          My Orders &nbsp;
          <Link to="/order" style={{ fontSize: 18 }}>
            +
          </Link>
        </h2>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Bids</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(row => (
              <TableRow key={row.prim_key}>
                <TableCell component="th" scope="row">
                  #{row.prim_key}
                </TableCell>
                <TableCell numeric>{row.noOfBids}</TableCell>
                <TableCell>
                  <Link to={`/orders/${row.prim_key}`}>VIEW</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>BUYER DASHBOARD</h2>
        <br />

        {this.renderBusinesses()}
        <br />

        {this.renderOrders()}
      </div>
    );
  }
}

Component.propTypes = {};

const mapStateToProps = state => {
  return {
    businesses: myBusinessesSelector(state),
    orders: myOrdersSelector(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
