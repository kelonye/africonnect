import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import { getOrderByKey, getOrderBids, bidsMapSelector } from 'selectors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const styles = theme => ({});

class Component extends React.Component {
  acceptBid() {}

  render() {
    const { classes, order, bids } = this.props;
    if (!(order && order.business)) return null;
    return (
      <div>
        <div>
          <h4 style={{ margin: 0 }}>Order #{order.prim_key}</h4>
          <h5 style={{ margin: 0 }}>
            You can accept the below bids made to this order:
          </h5>
        </div>
        <br />
        <div>Business: {order.business.name}</div>
        <div>Quantity: {order.quantity}</div>
        <div>Variety: {order.variety.name}</div>
        <div>Budget Unit Price: ${order.budget_unit_price}</div>
        <div>Total Cost: ${order.total_cost}</div>
        <br />
        <div>Bids:</div>
        <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Group</TableCell>
                <TableCell>Reputation</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Cost Difference</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {bids.map(row => (
                <TableRow key={row.prim_key}>
                  <TableCell component="th" scope="row">
                    {row.group.name}
                  </TableCell>
                  <TableCell numeric>
                    {Math.round(10 * Math.random())}
                  </TableCell>
                  <TableCell numeric>${row.unit_price}</TableCell>
                  <TableCell numeric>${row.total_cost}</TableCell>
                  <TableCell numeric>
                    ${row.total_cost - order.total_cost}
                  </TableCell>
                  <TableCell>
                    <Button onChange={() => this.acceptBid(row)}>ACCEPT</Button>
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
  const orderId = Number(ownProps.match.params.id);
  return {
    order: getOrderByKey(orderId),
    bids: getOrderBids(orderId),
    bidsMap: bidsMapSelector(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
