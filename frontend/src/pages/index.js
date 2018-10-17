import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Header from 'components/header';
import Home from 'pages/home';
import Buy from 'pages/buy';
import Sell from 'pages/sell';
import CreateGroup from 'pages/404';
import AddBusiness from 'pages/add-business';
import NewOrder from 'pages/order';
import Login from 'pages/login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { USER } from 'eos';
import theme from 'theme';

const styles = theme => ({});

class Component extends React.Component {
  render() {
    return (
      <div>
        <Router>
          {USER ? (
            <div>
              <Header />
              <Route exact path="/" component={Home} />
              <Route exact path="/buy" component={Buy} />
              <Route exact path="/sell" component={Sell} />
              <Route path="/create-group" component={CreateGroup} />
              <Route path="/add-business" component={AddBusiness} />
              <Route path="/order" component={NewOrder} />
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

export default theme(withStyles(styles)(Component));
