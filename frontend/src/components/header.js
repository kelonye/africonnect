import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import theme from 'theme';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  button: {}
});

class Component extends React.Component {
  render() {
    const { user, classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            Zebra
          </Typography>

          {!user ? this.renderLoggedOut() : this.renderLoggedIn()}
        </Toolbar>
      </AppBar>
    );
  }

  renderLoggedIn() {
    const { user, logout } = this.props;
    return (
      <Button color="inherit" onClick={() => logout()}>
        Logout {user.name}
      </Button>
    );
  }

  renderLoggedOut() {
    const { login } = this.props;
    return (
      <Button color="inherit" onClick={() => login()}>
        Login
      </Button>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
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
)(theme(withStyles(styles)(Component)));
