import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Money from 'components/money';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Business from 'components/business';
import Variety from 'components/variety';
import OrderTotal from 'components/order-total';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    const { classes, orders } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flexGrow: 1 }}>
            <Typography variant="h6" style={{ color: 'gray' }} component="h2">
              FIND ORDERS
            </Typography>
          </div>
          <div>
            <Link to="/order" style={{ fontSize: 18 }}>
              <Button variant="contained" color="primary">
                Order
              </Button>
            </Link>
          </div>
        </div>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
                  #{row.prim_key}
                </TableCell>
                <TableCell>
                  <Business primKey={row.business} />
                </TableCell>
                <TableCell numeric>
                  <Variety variety={row.variety} />
                </TableCell>
                <TableCell numeric>{row.quantity}</TableCell>
                <TableCell numeric>
                  <Money money={row.budget_unit_price} />
                </TableCell>
                <TableCell numeric>
                  <OrderTotal order={row.prim_key} />
                </TableCell>
                <TableCell>
                  <Link to={`/bid/${row.prim_key}`}>
                    <Button color="secondary">BID</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ orders }) => {
  return {
    orders
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
