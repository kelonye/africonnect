import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import withStyles from '@material-ui/core/styles/withStyles';
import { businessesMapSelector } from 'selectors';

const styles = theme => ({});

const Component = ({ val }) => <span>{val}</span>;

const mapStateToProps = (state, { primKey, param = 'name' }) => {
  let val;
  if (!_.isNil(primKey)) {
    const business = businessesMapSelector(state)[primKey];
    if (business) {
      val = business[param];
    }
  }
  return {
    val
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
