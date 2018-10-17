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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({});

class Component extends React.Component {
  state = {
    activeTab: 0
  };

  renderGroups() {
    const { classes, groups } = this.props;
    return (
      <div>
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

        <br />
        <Link to="/create-group" style={{ fontSize: 18 }}>
          Create New Group
        </Link>
      </div>
    );
  }

  renderBusinesses() {
    const { classes, businesses } = this.props;
    return (
      <div>
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

        <br />
        <Link to="/add-business" style={{ fontSize: 18 }}>
          Add a Business
        </Link>
      </div>
    );
  }

  renderBids() {
    const { classes, bids } = this.props;
    return (
      <div>
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
                  #{row.orderObj.prim_key}
                </TableCell>
                <TableCell>{row.groupObj.name}</TableCell>
                <TableCell>{!row.won ? 'FALSE' : 'TRUE'}</TableCell>
                <TableCell>
                  <Link to={`/view-bid/${row.prim_key}`}>VIEW</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <br />
        <Link to="/orders" style={{ fontSize: 18 }}>
          Find Orders
        </Link>
      </div>
    );
  }

  render() {
    const { activeTab } = this.state;
    const tab = {
      0: 'renderGroups',
      1: 'renderBusinesses',
      2: 'renderBids'
    }[activeTab];

    return (
      <div>
        <h2>SELLER DASHBOARD</h2>
        <br />

        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, activeTab) => this.setState({ activeTab })}
        >
          <Tab label="My Groups" value={0} />
          <Tab label="My Businesses" value={1} />
          <Tab label="My Bids" value={2} />
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
    groups: myGroupsSelector(state),
    bids: myBidsSelector(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
