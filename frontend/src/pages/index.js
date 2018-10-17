import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { withStyles } from '@material-ui/core/styles';
import Header from 'components/header';
import Home from 'pages/home';
import Buy from 'pages/buy';
import Sell from 'pages/sell';
import CreateGroup from 'pages/404';
import AddBusiness from 'pages/add-business';
import NewOrder from 'pages/order';
import Orders from 'pages/orders';
import Login from 'pages/login';
import Bid from 'pages/bid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { USER } from 'eos';
import theme from 'theme';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
});

class Component extends React.Component {
  componentDidMount() {
    const { getBusinesses, getOrders, getGroups, getBids } = this.props;

    getBusinesses();
    getGroups();
    getOrders();
    getBids();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Router>
          {USER ? (
            <div>
              <Header />
              <br />
              <div className={classes.layout}>
                <Route exact path="/" component={Home} />
                <Route exact path="/buy" component={Buy} />
                <Route exact path="/sell" component={Sell} />
                <Route path="/create-group" component={CreateGroup} />
                <Route path="/add-business" component={AddBusiness} />
                <Route path="/order" component={NewOrder} />
                <Route path="/orders" component={Orders} />
                <Route path="/bid/:id" component={Bid} />
              </div>
            </div>
          ) : (
            <Login />
          )}
        </Router>
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(theme(withStyles(styles)(Component)));
