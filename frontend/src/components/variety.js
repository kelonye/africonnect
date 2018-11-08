import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import withStyles from '@material-ui/core/styles/withStyles';
import { VARIETIES } from 'selectors';

const styles = theme => ({});

const Component = ({ val }) => <span>{val}</span>;

const mapStateToProps = (state, { variety }) => {
  return {
    val: VARIETIES[variety]
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
