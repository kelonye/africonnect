import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import theme from 'theme';
import Header from 'components/header';
import Drawer from 'components/drawer';
import { USER } from 'eos';

import Dashboard from 'pages/dashboard';
import Groups from 'pages/groups';
import Businesses from 'pages/businesses';
import Orders from 'pages/orders';
import SearchOrders from 'pages/search-orders';
import Bids from 'pages/bids';
import CreateGroup from 'pages/404';
import AddBusiness from 'pages/add-business';
import NewOrder from 'pages/order';
import Login from 'pages/login';
import Bid from 'pages/bid';
import AcceptBid from 'pages/404';
import ViewOrder from 'pages/view-order';
import ViewBid from 'pages/view-bid';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  appBarSpacer: theme.mixins.toolbar
});

class Component extends React.Component {
  componentDidMount() {
    const {
      getBusinesses,
      getOrders,
      getGroups,
      getBids,
      getBalance
    } = this.props;

    getBusinesses();
    getGroups();
    getOrders();
    getBids();
    getBalance();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {!USER ? (
          <Login />
        ) : (
          <Router>
            <div className={classes.root}>
              <Header />
              <Drawer />

              <main className={classes.content}>
                <div className={classes.appBarSpacer} />

                <Route exact path="/" component={Dashboard} />
                <Route exact path="/businesses" component={Businesses} />
                <Route exact path="/groups" component={Groups} />

                {/* buyers */}
                <Route path="/orders" component={Orders} />
                <Route path="/search-orders" component={SearchOrders} />

                {/* sellers */}
                <Route exact path="/bids" component={Bids} />

                <Route path="/create-group" component={CreateGroup} />
                <Route path="/add-business" component={AddBusiness} />
                <Route path="/order" component={NewOrder} />
                <Route path="/bid/:id" component={Bid} />
                <Route path="/view-order/:id" component={ViewOrder} />
                <Route path="/view-bid/:id" component={ViewBid} />
                <Route path="/accept-bid/:id" component={AcceptBid} />
              </main>
            </div>
          </Router>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(theme(withStyles(styles)(Component)));
