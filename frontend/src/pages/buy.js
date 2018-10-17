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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({});

class Component extends React.Component {
  state = {
    activeTab: 0
  };

  renderBusinesses() {
    const { classes, businesses } = this.props;
    return (
      <div>
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

        <br />
        <Link to="/add-business" style={{ fontSize: 18 }}>
          Add
        </Link>
      </div>
    );
  }

  renderOrders() {
    const { classes, orders } = this.props;
    return (
      <div>
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
                  <Link to={`/view-order/${row.prim_key}`}>VIEW</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <br />
        <Link to="/order" style={{ fontSize: 18 }}>
          New Order
        </Link>
      </div>
    );
  }

  render() {
    const { activeTab } = this.state;
    const tab = {
      0: 'renderBusinesses',
      1: 'renderOrders'
    }[activeTab];

    return (
      <div>
        <h2>BUYER DASHBOARD</h2>
        <br />

        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, activeTab) => this.setState({ activeTab })}
        >
          <Tab label="My Businesses" value={0} />
          <Tab label="My Orders" value={1} />
        </Tabs>

        {this[tab]()}
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
