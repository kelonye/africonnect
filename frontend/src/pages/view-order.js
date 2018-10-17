import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import {
  getOrderByKey,
  getOrderBids,
  bidsMapSelector,
  ordersMapSelector
} from 'selectors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { USER, pushAction } from 'eos';
import Money from 'components/money';

const styles = theme => ({});

class Component extends React.Component {
  acceptBid(bid) {
    const { getOrders, order, history } = this.props;
    const data = {
      _owner: USER.name,
      _order: order.prim_key,
      _bid: bid.prim_key
    };

    console.log(data);

    pushAction('acceptbid', data)
      .then(getOrders)
      .then(() => {
        history.replace({
          pathname: '/buy'
        });
      });
  }

  render() {
    const { classes, order, bids } = this.props;
    if (!(order && order.businessObj)) return null;

    return (
      <div>
        <div>
          <h4 style={{ margin: 0 }}>Order #{order.prim_key}</h4>
          <h5 style={{ margin: 0 }}>
            You can accept the below bids made to this order:
          </h5>
        </div>
        <br />
        <div>Business: {order.businessObj.name}</div>
        <div>Quantity: {order.quantity}</div>
        <div>Variety: {order.varietyName}</div>
        <div>
          Budget Unit Price: <Money money={order.budget_unit_price} />
        </div>
        <div>
          Total Cost: <Money money={order.total_cost} />
        </div>
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
                    {row.groupObj.name}
                  </TableCell>
                  <TableCell numeric>
                    {Math.round(10 * Math.random())}
                  </TableCell>
                  <TableCell numeric>
                    <Money money={row.unit_price} />
                  </TableCell>
                  <TableCell numeric>
                    <Money money={row.total_cost} />
                  </TableCell>
                  <TableCell numeric>
                    <Money money={row.total_cost - order.total_cost} />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => this.acceptBid(row)}>ACCEPT</Button>
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
    bidsMap: bidsMapSelector(state),
    ordersMap: ordersMapSelector(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
