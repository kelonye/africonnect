import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import { getOrderByKey, getOrderBids } from 'utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { USER, pushAction } from 'eos';
import Money from 'components/money';
import Typography from '@material-ui/core/Typography';
import Business from 'components/business';
import Variety from 'components/variety';
import Group from 'components/group';
import OrderTotal from 'components/order-total';
import OrderDiff from 'components/order-diff';

const styles = theme => ({});

class Component extends React.Component {
  acceptBid(bid) {
    const { getOrders, order } = this.props;
    const data = {
      _owner: USER.name,
      _order: order.prim_key,
      _bid: bid.prim_key
    };

    console.log(data);

    pushAction('acceptbid', data).then(getOrders);
  }

  render() {
    const { classes, order, bids } = this.props;
    if (!order) return null;

    return (
      <div>
        <div>
          <Typography variant="h6" style={{ color: 'gray' }} component="h2">
            ORDER #{order.prim_key}
          </Typography>
          <h5 style={{ margin: 0 }}>
            You can accept the below bids made to this order:
          </h5>
        </div>
        <br />
        <div>
          Business: <Business primKey={order.business} />
        </div>
        <div>Quantity: {order.quantity}</div>
        <div>
          Variety: <Variety variety={order.variety} />
        </div>
        <div>
          Budget Unit Price: <Money money={order.budget_unit_price} />
        </div>
        <div>
          Total Cost: <OrderTotal order={order.prim_key} />
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
                    <Group primKey={row.group} />
                  </TableCell>
                  <TableCell numeric>
                    {Math.round(10 * Math.random())}
                  </TableCell>
                  <TableCell numeric>
                    <Money money={row.unit_price} />
                  </TableCell>
                  <TableCell numeric>
                    <OrderTotal order={row.order} />
                  </TableCell>
                  <TableCell numeric>
                    <OrderDiff order={row.order} bid={row.prim_key} />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => this.acceptBid(row)}
                      color="secondary"
                    >
                      ACCEPT
                    </Button>
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
    order: getOrderByKey(state, orderId),
    bids: getOrderBids(state, orderId)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
