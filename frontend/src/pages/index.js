import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card: {
    margin: 20
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  button: {
    marginTop: theme.spacing.unit,
    width: '100%'
  }
});

class Component extends React.Component {
  render() {
    const { user, classes } = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Africonnect
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper}>
          {!user ? this.renderLoggedOut() : this.renderLoggedIn()}
        </Paper>
      </div>
    );
  }

  renderLoggedIn() {
    const { user, logout, classes } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
        onClick={() => logout()}
      >
        Logout {user.name}
      </Button>
    );
  }

  renderLoggedOut() {
    const { login, classes } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
        onClick={() => login()}
      >
        Login
      </Button>
    );
  }
}

Component.propTypes = {
  user: PropTypes.any,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
