import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import withStyles from '@material-ui/core/styles/withStyles';
import { ordersMapSelector } from 'selectors';
import Money from 'components/money';

const styles = theme => ({});

const Component = ({ val }) => <Money money={val} />;

const mapStateToProps = (state, { order: orderPrimKey }) => {
  let val;
  const order = ordersMapSelector(state)[orderPrimKey];
  if (order) {
    val = order.quantity * order.budget_unit_price;
  }
  return {
    val
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
