import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import {
  getBusinessByKey,
  getOrderByKey,
  getBidByKey,
  getGroupByKey
} from 'utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Money from 'components/money';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    const { classes, order, bid, businesses } = this.props;
    if (!(bid && order)) return null;
    return (
      <div>
        <div>
          <Typography variant="h6" style={{ color: 'gray' }} component="h2">
            ORDER #{order.prim_key}
          </Typography>
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
                    <Money money={row.payment} />
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
  const bidPrimKey = Number(ownProps.match.params.id);
  const bid = getBidByKey(state, bidPrimKey);
  let order;
  let businesses = [];
  if (bid) {
    order = getOrderByKey(state, bid.order);
    const group = getGroupByKey(state, bid.group);
    if (group) {
      businesses = group.members.map(id => getBusinessByKey(state, id));
    }
  }
  return {
    order,
    bid,
    businesses
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
