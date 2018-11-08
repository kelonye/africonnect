import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import { USER } from 'eos';
import classNames from 'classnames';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Money from 'components/money';

const drawerWidth = 240;

const styles = theme => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  }
});

class Component extends React.Component {
  render() {
    const { classes, drawerOpen, showDrawer, balance } = this.props;

    return (
      <AppBar
        position="absolute"
        color="default"
        className={classNames(
          classes.appBar,
          drawerOpen && classes.appBarShift
        )}
        style={{
          background: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          boxShadow: 'none'
        }}
      >
        <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={showDrawer}
            className={classNames(
              classes.menuButton,
              drawerOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            AFRICONNECT
          </Typography>

          <Typography component="h6" variant="subtitle1" color="inherit" noWrap>
            {USER.name}
            &nbsp; &nbsp;
            <Money
              money={balance}
              style={{
                background: '#a8c2e21c',
                borderRadius: 5,
                padding: '5px 7px'
              }}
            />
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={5} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ balance, drawer }) => {
  return {
    balance,
    drawerOpen: drawer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
