import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import withStyles from '@material-ui/core/styles/withStyles';
import { getOrderBids } from 'utils';

const styles = theme => ({});

const Component = ({ val }) => <span>{val}</span>;

const mapStateToProps = (state, { order: orderPrimKey }) => {
  return {
    val: getOrderBids(state, orderPrimKey).length
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
