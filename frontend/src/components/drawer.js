import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import DashboardIcon from '@material-ui/icons/Dashboard';
import OrdersIcon from '@material-ui/icons/ShoppingCart';
import GroupsIcon from '@material-ui/icons/People';
import BusinessesIcon from '@material-ui/icons/LocalShipping'; // LocationCity
import BidsIcon from '@material-ui/icons/MonetizationOn';

import ProfileIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Build';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

const drawerWidth = 240;

const styles = theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  }
});

const mainListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/businesses">
      <ListItem button>
        <ListItemIcon>
          <BusinessesIcon />
        </ListItemIcon>
        <ListItemText primary="My Businesses" />
      </ListItem>
    </Link>
    <Link to="/groups">
      <ListItem button>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="My Groups" />
      </ListItem>
    </Link>
    <Link to="/orders">
      <ListItem button>
        <ListItemIcon>
          <OrdersIcon />
        </ListItemIcon>
        <ListItemText primary="My Orders" />
      </ListItem>
    </Link>
    <Link to="/bids">
      <ListItem button>
        <ListItemIcon>
          <BidsIcon />
        </ListItemIcon>
        <ListItemText primary="My Bids" />
      </ListItem>
    </Link>
  </div>
);

const secondaryListItems = (
  <div>
    <ListSubheader inset>ACCOUNT</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <ProfileIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

class Component extends React.Component {
  render() {
    const { classes, drawerOpen, hideDrawer } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose
          )
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={hideDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    );
  }
}

const mapStateToProps = ({ drawer }) => {
  return {
    drawerOpen: drawer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
