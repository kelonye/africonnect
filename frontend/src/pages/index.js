import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from 'components/header';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class Component extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <Paper className={classes.paper} />
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
