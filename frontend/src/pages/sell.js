import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import {
  myBusinessesSelector,
  myGroupsSelector,
  myBidsSelector
} from 'selectors';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({});

class Component extends React.Component {
  renderGroups() {
    const { classes, groups } = this.props;
    return (
      <div>
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          My Groups &nbsp;
          <Link to="/create-group" style={{ fontSize: 18 }}>
            +
          </Link>
        </h2>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Reputation</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map(row => (
              <TableRow key={row.prim_key}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>{row.members.length}</TableCell>
                <TableCell numeric>{row.reputation}</TableCell>
                <TableCell>
                  <Link to={`/group/${row.prim_key}`}>VIEW</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

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
              <TableCell>Reputation</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {businesses.map(row => (
              <TableRow key={row.prim_key}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>{row.reputation}</TableCell>
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

  renderBids() {
    const { classes, bids } = this.props;
    return (
      <div>
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          My Bids &nbsp;
          <Link to="/orders" style={{ fontSize: 18 }}>
            Find Orders
          </Link>
        </h2>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>WON</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {bids.map(row => (
              <TableRow key={row.prim_key}>
                <TableCell component="th" scope="row">
                  #{row.order.prim_key}
                </TableCell>
                <TableCell>{row.group.name}</TableCell>
                <TableCell>{!row.won ? 'FALSE' : 'TRUE'}</TableCell>
                <TableCell>
                  <Link to={`/group/${row.prim_key}`}>VIEW</Link>
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
        <h2>SELLER DASHBOARD</h2>
        <br />

        {this.renderGroups()}
        <br />

        {this.renderBusinesses()}
        <br />

        {this.renderBids()}
      </div>
    );
  }
}

Component.propTypes = {};

const mapStateToProps = state => {
  return {
    businesses: myBusinessesSelector(state),
    groups: myGroupsSelector(state),
    bids: myBidsSelector(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
