import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import UserIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  button: {},
  hr: {
    margin: 0,
    borderStyle: 'solid',
    borderColor: '#eee',
    borderWidth: 1,
    borderBottom: 'none'
  }
});

class Component extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { account, classes } = this.props;
    return (
      <Toolbar className={classes.toolbarMain}>
        <Typography variant="title" color="inherit" className={classes.grow}>
          AFRICONNECT
        </Typography>

        {!account ? this.renderLoggedOut() : this.renderLoggedIn()}
      </Toolbar>
    );
  }

  renderLoggedIn() {
    const { open } = this.state;
    const { account, logout, classes } = this.props;
    return (
      <div>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'header-actions-menu-list' : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <UserIcon />
        </IconButton>

        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="header-actions-menu-list"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'left top' : 'left bottom',
                right: -47,
                top: 8,
                position: 'absolute'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem>{account.name}</MenuItem>
                    <hr className={classes.hr} />
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Account</MenuItem>
                    <hr className={classes.hr} />
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }

  renderLoggedOut() {
    const { login } = this.props;
    return (
      <Button color="inherit" variant="outlined" size="small" onClick={login}>
        Login
      </Button>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  account: PropTypes.any,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => {
  const [account] = user ? user.accounts : [];
  return {
    account
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
