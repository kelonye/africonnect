import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import {
  getOrderByKey,
  getBidByKey,
  bidsMapSelector,
  ordersMapSelector,
  getGroupBusinesses
} from 'selectors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Money from 'components/money';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    const { classes, order, bid, businesses } = this.props;
    if (!(bid && order)) return null;
    return (
      <div>
        <div>
          <h4 style={{ margin: 0 }}>Order #{order.prim_key}</h4>
          <h5 style={{ margin: 0 }}>
            The below is a breakdown of the delivery status of the members
            participating in this order:
          </h5>
        </div>
        <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Business</TableCell>
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses.map(row => (
                <TableRow key={row.prim_key}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell numeric>
                    <Money money={bid.total_cost / businesses.length} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const bidId = Number(ownProps.match.params.id);
  const bid = getBidByKey(bidId);
  let order;
  let businesses = [];
  if (bid && bid.orderObj && bid.groupObj) {
    order = getOrderByKey(bid.orderObj.prim_key);
    businesses = getGroupBusinesses(bid.groupObj);
  }
  return {
    order,
    bid,
    bidsMap: bidsMapSelector(state),
    ordersMap: ordersMapSelector(state),
    businesses
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
